import { Router, Request, Response } from 'express';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = Router();

async function helloWorld(req: Request, res: Response): Promise<void> {
  res.json({ message: 'Hello World!' });
}

router.get(
  '/hello-world',
  AuthMiddleware.authenticate,
  helloWorld
);

export default router;
