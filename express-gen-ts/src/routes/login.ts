import { Router } from 'express';
import LoginController from '../app/controllers/LoginController';

const routes = Router();

routes.post('/signup', LoginController.createUser);

routes.post('/login', LoginController.login);

routes.get('/logout', LoginController.logout);

export default routes;
