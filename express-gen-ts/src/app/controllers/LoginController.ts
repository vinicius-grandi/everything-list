import { Request, Response } from "express";
import db from "../models";
const { User } = db;

const LoginController = {
  async createUser(req: Request, res: Response) {
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
      
      return res.json(user);
    } catch (err) {
        return res.status(400).send({ msg: 'Bad Request' });
    }
  }
}

export default LoginController;
