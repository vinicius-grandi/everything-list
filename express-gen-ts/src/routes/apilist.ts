import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import auth from '../auth/auth';
import ItemController from '../app/controllers/ItemController';
import ApiController from '../app/controllers/ApiController';

const routes = Router();

const rateLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 60,
  keyGenerator(req: Request): string {
    return req.ip;
  },
  handler(_, res: Response): void {
    res.status(429).json({
      error: 'Too many requests, go drink some water and come back later',
    });
  },
});
routes.use(rateLimiter);
routes.get('/api', ApiController.getItems.bind(ApiController));

routes.use(auth);
routes.post('/api/:id', ItemController.sendRating.bind(ItemController));
routes.put('/api/:id', ItemController.updateRating.bind(ItemController));

export default routes;
