import { Router } from 'express';
import auth from '../auth/auth';
import ItemController from '../app/controllers/ItemController';
import ApiController from '../app/controllers/ApiController';

const routes = Router();

routes.get('/', ApiController.getItems.bind(ApiController));

routes.use(auth);
routes.post('/:id', ItemController.sendRating.bind(ItemController));
routes.put('/:id', ItemController.updateRating.bind(ItemController));

export default routes;
