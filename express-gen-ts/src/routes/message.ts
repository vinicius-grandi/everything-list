import { Router } from 'express';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.get('/message', (req, res) => {
  res.send('Salve');
});

// Export default.
export default baseRouter;
