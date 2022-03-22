import { Router } from 'express';
import auth from '../auth/auth';
import WeaponController from '../app/controllers/WeaponController';

const routes = Router();

routes.get('/:id', WeaponController.getWeapon);

routes.use(auth);
routes.post('/:id', WeaponController.sendRating.bind(WeaponController));
routes.put('/:id', WeaponController.updateRating.bind(WeaponController));

export default routes;
