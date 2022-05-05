import { NextFunction, Request, Response } from 'express';
import db from '../app/models';

const { User } = db;

export default async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findByPk(req.session.userId);
  if (!user) {
    return res.status(401).json({ error: 'not authorized.' });
  }
  return next();
};
