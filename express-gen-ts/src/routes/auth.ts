import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';

const routes = Router();

routes.post('/signup', AuthController.createUser);

routes.post('/login', AuthController.login);

routes.get('/logout', AuthController.logout);

export default routes;
