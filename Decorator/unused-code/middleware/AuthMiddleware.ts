import { Request, Response, NextFunction } from 'express';

interface User {
  email: string;
  password: string;
}
const user = { email: "secret@gmail.com", password: "1234" };

async function findUserByEmail(email: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
}

class AuthMiddleware {

  static async authenticate(req: Request, res: Response, next: NextFunction): Promise<void | undefined> {
    const authHeader = req.headers['authorization'];


    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
      return;
    }

    // Decodifica a parte base64 do cabeçalho Authorization
    const base64Credentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

    // Divide o resultado no formato username:password
    const [email, password] = decodedCredentials.split(':');
    if (!email || !password) {
      res.status(401).json({ message: 'Unauthorized: Invalid Basic Auth format' });
      return;
    }

    const foundUser = await findUserByEmail(email);
    // Compara as credenciais com os valores esperados
    if (email !== foundUser.email || password !== foundUser.password) {
      res.status(403).json({ message: 'Forbidden: Invalid username or password' });
      return;
    }

    // Credenciais válidas, prossegue para o próximo middleware
    next();
  }

}

export default AuthMiddleware;
