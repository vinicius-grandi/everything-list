import { Router } from 'express';
import auth from '../auth/auth';
import WeaponController from '../app/controllers/WeaponController';

const routes = Router();

routes.get('/:id', WeaponController.getWeapon);

routes.use(auth);
routes.post('/:id', WeaponController.sendRating);

export default routes;
