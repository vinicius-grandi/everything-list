import { Router } from 'express';
import SearchController from '../app/controllers/SearchController';

const routes = Router();

routes.get('/find', SearchController.find.bind(SearchController));

export default routes;
