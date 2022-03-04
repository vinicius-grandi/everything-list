import { Router } from 'express';
import LoginController from '../app/controllers/LoginController';

const routes = Router();

routes.post('/register', LoginController.createUser);

export default routes;
