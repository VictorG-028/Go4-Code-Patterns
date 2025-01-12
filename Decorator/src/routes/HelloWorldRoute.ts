import { Router } from 'express';

const router = Router();


/* Roteiro:
- Eu quero criar uma pipeline que
1- Autentica o usuário usando basic auth
2- Guarda o usuário autenticado no header para ser usado na pipeline de processamento
3- Verifica se o usuário tem permissão para acessar a rota
4- Responde helloworld caso o usuário autenticado tenha permissão
- As vezes essa pipeline precisa ser chama sem a necessidade de autenticação ou de permissão ou de guardar o usuário que foi autenticado
- Para isso existem 2 soluções:
1- Hardcode cada combinação de chamada de pipeline
2- Usar um decorator para adicionar ou remover funcionalidades (modularizar) da pipeline criando pipelines alternativas facilmente
- O caso da rota decorator-3 demonstra o problema de estado compartilhado e importância de ordem de execução de middlewares
- Esse caso pode ser corrigido com um middleware focado em carregar o user
*/


////////////////////////////////////////////////////////////////////////////////


// Hardcoded logics for each possible way to call the controller
import Problematic_HelloWorldController from '../controllers/problematic_code/Problematic_HelloWorldController';
import BasicAuth_HelloWorldController from '../controllers/problematic_code/BasicAuth_HelloWorldController';
import Permission_HelloWorldController from '../controllers/problematic_code/Permission_HelloWorldController';
import BasicAuth_Permission_HelloWorldController from '../controllers/problematic_code/BasicAuth_Permission_HelloWorldController';


const helloWorld_Controller = new Problematic_HelloWorldController();
const basicAuth_HelloWorld_Controller = new BasicAuth_HelloWorldController();
const permission_HelloWorld_Controller = new Permission_HelloWorldController();
const basicAuth_Permission_HelloWorld_Controller = new BasicAuth_Permission_HelloWorldController();



router.get(
  '/no-code-pattern-1',
  (req, res, next) => helloWorld_Controller.execute(req, res, {})
);
router.get(
  '/no-code-pattern-2',
  (req, res, next) => basicAuth_HelloWorld_Controller.execute(req, res, {})
);
router.get(
  '/no-code-pattern-3',
  (req, res, next) => basicAuth_Permission_HelloWorld_Controller.execute(req, res, {})
);
router.get(
  '/no-code-pattern-4',
  (req, res, next) => permission_HelloWorld_Controller.execute(req, res, {})
);


////////////////////////////////////////////////////////////////////////////////


import HelloWorldController from '../controllers/solution_code/HelloWorldController';
import BasicAuthMiddleware from '../middlewares/BasicAuthMiddleware';
import HasPermissionMiddleware from '../middlewares/HasPermissionMiddleware';


// Separa em duas partes
const controller = new HelloWorldController();
const basicAuthController = new BasicAuthMiddleware(controller);
const hasPermissionController = new HasPermissionMiddleware(controller);
const hasPermissionAndBasicAuthController = new BasicAuthMiddleware(new HasPermissionMiddleware(controller));

router.get(
  '/decorator-1',
  (req, res, next) => controller.execute(req, res, {})
);
router.get(
  '/decorator-2',
  (req, res, next) => basicAuthController.execute(req, res, {})
);
router.get(
  '/decorator-3', // Nesse caso sempre retorna erro 500, pois o user não é carregado no shared state
  (req, res, next) => hasPermissionController.execute(req, res, {})
);
router.get(
  '/decorator-4',
  (req, res, next) => hasPermissionAndBasicAuthController.execute(req, res, {})
);


export default router;

