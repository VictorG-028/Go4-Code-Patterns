import { Request, Response } from 'express';
import SharedState from './SharedState';

interface Controller {
  execute: (req: Request, res: Response, sharedState: SharedState) => Promise<void>;
}

export default Controller;
