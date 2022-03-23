import { Router } from 'express';
import auth from '../auth/auth';
import ItemController from '../app/controllers/ItemController';

const routes = Router();

routes.get('/:id', ItemController.getItem);

routes.use(auth);
routes.post('/:id', ItemController.sendRating.bind(ItemController));
routes.put('/:id', ItemController.updateRating.bind(ItemController));

export default routes;
