import { Request, Response, NextFunction } from 'express';
import Middleware from '../interfaces/Middleware';
import Controller from '../interfaces/Controller';
import User from '../interfaces/User';
import SharedState from '../interfaces/SharedState';


class CheckPermissionMiddleware implements Middleware {
  controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    const hasPermission = await CheckPermissionMiddleware.checkPermission(req, res, sharedState);
    if (!hasPermission) { return; }

    return this.controller.execute(req, res, sharedState);
  }

  private static async checkPermission(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const wantsTo = req.headers['wants-to'];
    console.log(req.headers);
    const user = sharedState['user'];

    if (!wantsTo) {
      res.status(400).json({ message: 'Bad request: Missing "wantsTo" header' });
      return false;
    }

    if (!user) {
      res.status(500).json({ message: 'Internal Server Error: User header not found' });
      return false;
    }

    const hasPermission = CheckPermissionMiddleware.hasPermission(user, wantsTo);

    if (!hasPermission) {
      res.status(403).json({ message: 'Forbidden: User does not have permission' });
      return false;
    }

    return true;
  }


  private static hasPermission(user: User, wantsTo: string | string[]): boolean {
    if (typeof wantsTo === 'string') {
      return user.permissions.includes(wantsTo);
    } else {
      return wantsTo.every(wantsTo => user.permissions.includes(wantsTo));
    }
  }

}

export default CheckPermissionMiddleware;
