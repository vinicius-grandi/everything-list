import { Request, Response } from "express";
import db from "../models";
import { UserAttributes } from "../models/User";
const { User } = db;

const LoginController = {
  async createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    console.log(username, email, password)
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

      const session = req.session;
      session.userId = user.id;

      return res.json({ user, session });
    } catch (err) {
        console.error(err.message)
        return res.status(400).send({ msg: 'Bad Request' });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user: UserAttributes = User.findOne({
      where: { email, password }
    });

    if (email === user.email && password === user.password) {
      const session = req.session;
      session.userId = user.id;
      return res.json(user);
    }
  },
}

export default LoginController;
