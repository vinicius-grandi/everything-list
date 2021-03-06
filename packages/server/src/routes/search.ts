import { Router } from 'express';
import SearchController from '../app/controllers/SearchController';

const routes = Router();

routes.get('/search/api', SearchController.find.bind(SearchController));

export default routes;
