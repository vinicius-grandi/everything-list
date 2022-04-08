import { Request, Response } from 'express';
import logger from 'jet-logger';
import db from '../models';

interface IUserCredentials {
  username: string;
  email: string;
  password: string;
}

const { User } = db;

const AuthController = {
  async createUser(
    req: Request<unknown, unknown, IUserCredentials>,
    res: Response,
  ) {
    const { username, email, password } = req.body;
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username,
          email,
          password,
        },
      });

      if (!created) {
        return res.status(409).send({ msg: 'User Already Exists' });
      }
      // creating session
      const { session } = req;
      session.authenticated = true;
      session.userId = user.id;
      session.user = {
        ...user.dataValues,
        password: undefined,
        password_hash: undefined,
      };

      return res.json({ user, session });
    } catch (err) {
      logger.err(err);
      return res.status(400).send({ msg: 'Bad Request' });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (req.session.authenticated) {
      return res.redirect('/');
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid Username/Password' });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (email === user.email && isPasswordValid) {
      const { session } = req;
      session.authenticated = true;
      session.userId = user.id;
      session.user = {
        ...user.dataValues,
        password: undefined,
        password_hash: undefined,
      };

      return res.json(session);
    }

    return res.status(401).json({ message: 'Invalid Username/Password' });
  },
  logout(req: Request, res: Response) {
    req.session.destroy(() => res.redirect('/'));
  },
};

export default AuthController;
