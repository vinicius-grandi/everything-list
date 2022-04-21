import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import auth from '../auth/auth';

const routes = Router();

routes.use(auth);
routes.get('/api/0', UserController.getUserInfo.bind(UserController));
routes.get(
  '/api/0?review=false',
  UserController.getUserInfo.bind(UserController),
);
routes.put('/api/0', UserController.updateProfilePicture.bind(UserController));

export default routes;
