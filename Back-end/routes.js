import { Router } from 'express';
import SessionController from './controllers/SessionController';


const routes = new Router();

routes.post('/sessions',SessionController.store);
routes.put('/sessions/:user_id',SessionController.update);
export default routes;