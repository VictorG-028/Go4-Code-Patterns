import { NextFunction, Request, Response } from 'express';
import Controller from '../../interfaces/Controller';
import SharedState from '../../interfaces/SharedState';

class Problematic_HelloWorldController implements Controller {

  // Hard coded to not use Basic Auth and HasPermission
  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    res.send('Hardcoded Hello World!');
  }

}

export default Problematic_HelloWorldController;
