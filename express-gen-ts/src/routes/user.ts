import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import auth from '../auth/auth';

const routes = Router();

routes.use(auth);
routes.get('/api/0', UserController.createProfilePicture);

export default routes;