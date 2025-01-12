import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Controller from '../../interfaces/Controller';
import findUserByEmail from '../../utils/findUser';
import User from '../../interfaces/User';
import SharedState from '../../interfaces/SharedState';

class Problematic_BasicAuth_HasPermission_HelloWorldController implements Controller {

  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    const isAuthorized = await this.authorize(req, res, sharedState);
    if (!isAuthorized) { return; }

    const hasPermission = await this.checkPermission(req, res, sharedState);
    if (!hasPermission) { return; }

    res.send('Hardcoded [with Basic Auth and Has Permission] Hello World!');
  }


  private async authorize(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
      return false;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');

    if (!email || !password) {
      res.status(401).json({ message: 'Unauthorized: Invalid Basic Auth format' });
      return false;
    }

    const foundUser = await findUserByEmail(email);

    const hasCorrectPass = await bcrypt.compare(password, foundUser.password).then(result => result);
    if (!hasCorrectPass) {
      res.status(401).json({ message: 'Unauthorized: Invalid username or password' });
      return false;
    }

    sharedState['user'] = foundUser;

    return true;
  }


  private async checkPermission(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const wantsTo = req.headers['wants-to'];
    const user = sharedState['user'];

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

export default Problematic_BasicAuth_HasPermission_HelloWorldController;
