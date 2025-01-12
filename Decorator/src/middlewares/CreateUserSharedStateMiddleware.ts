import { NextFunction, Request, Response } from 'express';
import Middleware from '../interfaces/Middleware';
import Controller from '../interfaces/Controller';
import findUserByEmail from '../utils/findUser';
import decodeBasicAuth from '../utils/decodeBasicAuth';
import SharedState from '../interfaces/SharedState';


class CreateUserSharedStateMiddleware implements Middleware {
  /*
    Expects user to come in basic auth header
  */
  controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    const shouldReturnEarly = await CreateUserSharedStateMiddleware.createUserHeader(req, res, sharedState);
    if (shouldReturnEarly) { return; }
    return this.controller.execute(req, res, sharedState);
  }

  static async createUserHeader(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(400).json({ message: 'Bad request: Missing "Basic " substring at start of authorization header' });
      return true;
    }

    const [email, password] = decodeBasicAuth(authHeader);

    const foundUser = await findUserByEmail(email).catch((e) => null);
    if (!foundUser) {
      return true; // Fail to create user header
    }

    sharedState['user'] = foundUser;
    return false;
  }

}

export default CreateUserSharedStateMiddleware;




