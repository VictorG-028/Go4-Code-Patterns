import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Controller from '../../interfaces/Controller';
import findUserByEmail from '../../utils/findUser';
import SharedState from '../../interfaces/SharedState';
import decodeBasicAuth from '../../utils/decodeBasicAuth';

class Problematic_BasicAuth_HelloWorldController implements Controller {

  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    const isAuthorized = await this.authorize(req, res, sharedState);
    if (!isAuthorized) { return; }

    res.send('Hardcoded [with Basic Auth] Hello World!');
  }


  private async authorize(req: Request, res: Response, sharedState: SharedState): Promise<boolean> {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
      return false;
    }

    const [email, password] = decodeBasicAuth(authHeader);

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

}

export default Problematic_BasicAuth_HelloWorldController;
