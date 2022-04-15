import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';

const routes = Router();

routes.get('/logout', AuthController.logout);
routes.get('/is-user-auth', AuthController.isUserAuth);

routes.post('/signup', AuthController.createUser);
routes.post('/login', AuthController.login);

export default routes;
