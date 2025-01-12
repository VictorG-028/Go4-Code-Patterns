import { NextFunction, Request, Response } from 'express';
import Controller from '../../interfaces/Controller';
import User from '../../interfaces/User';
import SharedState from '../../interfaces/SharedState';
import findUserByEmail from '../../utils/findUser';
import decodeBasicAuth from '../../utils/decodeBasicAuth';

class Problematic_HasPermission_HelloWorldController implements Controller {

  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {

    const hasPermission = await this.checkPermission(req, res, sharedState);
    if (!hasPermission) { return; }

    res.send('Hardcoded [with Has Permission] Hello World!');
  }


  private async checkPermission(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const wantsTo = req.headers['wants-to'];

    // --- //
    // Codigo especifico dessa rota hardcoded
    const authorization = req.headers['authorization'];
    if (!authorization) {
      res.status(400).json({ message: 'Bad request: Missing "Authorization" header' });
      return false;
    }
    const [email, password] = decodeBasicAuth(authorization);
    const user = await findUserByEmail(email);
    if (user) {
      res.status(401).json({ message: 'Unauthorized: User not found' });
      return false;
    }
    // --- //


    if (!wantsTo) {
      res.status(400).json({ message: 'Bad request: Missing "wantsTo" header' });
      return false;
    }

    if (!user) {
      res.status(500).json({ message: 'Internal Server Error: User header not found' });
      return false;
    }

    const hasPermission = this.hasPermission(user, wantsTo);

    if (!hasPermission) {
      res.status(403).json({ message: 'Forbidden: User does not have permission' });
      return false;
    }

    return true;
  }


  private hasPermission(user: User, wantsTo: string | string[]): boolean {
    if (typeof wantsTo === 'string') {
      return user.permissions.includes(wantsTo);
    } else {
      return wantsTo.every(wantsTo => user.permissions.includes(wantsTo));
    }
  }

}

export default Problematic_HasPermission_HelloWorldController;
