import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.authenticated) {
    return res.status(401).json({ error: 'not authorized.' });
  }
  return next();
};
