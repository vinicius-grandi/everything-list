import { Router } from 'express';
import WeaponController from '../app/controllers/WeaponController';

const routes = Router();

routes.get('/:id', WeaponController.getWeapon);

export default routes;
