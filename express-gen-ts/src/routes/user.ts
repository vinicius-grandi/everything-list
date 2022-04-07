import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import auth from '../auth/auth';

const routes = Router();

routes.use(auth);
routes.get('/api/0', UserController.getUserInfo);
routes.put('/api/0', UserController.updateProfilePicture);

export default routes;
