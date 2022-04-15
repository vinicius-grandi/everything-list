import { Router } from 'express';
import auth from '../auth/auth';
import ItemController from '../app/controllers/ItemController';

const routes = Router();

routes.get('/api/:id', ItemController.getItem);

routes.use(auth);
routes.post('/api/:id', ItemController.sendRating.bind(ItemController));
routes.put('/api/:id', ItemController.updateRating.bind(ItemController));

export default routes;
