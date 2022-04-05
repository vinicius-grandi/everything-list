import { Request, Response } from 'express';
import db from '../models';
import { UserAttributes } from '../models/User';

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
    console.log('jojo');
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

      const { session } = req;

      try {
        session.authenticated = true;
        session.userId = user.id;
      } catch (err) {
        console.error(err.message);
      }

      return res.json({ user, session });
    } catch (err) {
      return res.status(400).send({ msg: 'Bad Request' });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user: UserAttributes = await User.findOne({
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
      return res.json(session);
    }

    return res.status(401).json({ message: 'Invalid Username/Password' });
  },
  logout(req: Request, res: Response) {
    req.session.destroy(() => res.redirect('/'));
  },
};

export default AuthController;
