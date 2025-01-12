import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Middleware from '../interfaces/Middleware';
import Controller from '../interfaces/Controller';
import SharedState from '../interfaces/SharedState';
import findUserByEmail from '../utils/findUser';
import decodeBasicAuth from '../utils/decodeBasicAuth';


class BasicAuthMiddleware implements Middleware {
  /*
    Expects user to come in basic auth header
    This have a colateral effect of creating a user header.
  */

  controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }


  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    const isAtuhorized = await BasicAuthMiddleware.authenticate(req, res, sharedState);
    if (!isAtuhorized) { return; }
    return this.controller.execute(req, res, sharedState);
  }


  private static async authenticate(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(400).json({ message: 'Bad request: Missing "Basic " substring at start of authorization header' });
      return false;
    }

    const [email, password] = decodeBasicAuth(authHeader);

    const foundUser = await findUserByEmail(email).catch((e) => null);
    if (!foundUser) {
      res.status(401).json({ message: 'Unauthorized: Invalid username or password' });
      return false;
    }

    const hasCorrectPass = await bcrypt.compare(password, foundUser.password).then(result => result);
    if (!hasCorrectPass) {
      res.status(401).json({ message: 'Unauthorized: Invalid username or password' });
      return false;
    }

    sharedState['user'] = foundUser;
    return true;
  }

}

export default BasicAuthMiddleware;
