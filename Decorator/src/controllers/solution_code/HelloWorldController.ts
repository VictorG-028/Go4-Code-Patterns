import { NextFunction, Request, Response } from 'express';
import Controller from '../../interfaces/Controller';
import SharedState from '../../interfaces/SharedState';

class HelloWorldController implements Controller {

  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<void> {
    res.send('Decorated Hello World!');
  }

}

export default HelloWorldController;
