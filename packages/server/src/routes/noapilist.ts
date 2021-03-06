import { Router } from 'express';
import auth from '../auth/auth';
import ItemController from '../app/controllers/ItemController';
import NoApiController from '../app/controllers/NoApiController';
import ApiController from '../app/controllers/ApiController';

const routes = Router();

routes.get('/api', NoApiController.getAllItems.bind(NoApiController));
routes.get('/api/:id/comments', ApiController.getComments.bind(ApiController));
routes.get('/api/:id', ItemController.getItem.bind(ItemController));

routes.post('*', auth);
routes.post('/api/:id', ItemController.sendRating.bind(ItemController));
routes.put('/api/:id', ItemController.updateRating.bind(ItemController));

export default routes;
