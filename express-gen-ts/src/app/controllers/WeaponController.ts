import { Request, Response } from 'express';
import db from '../models';
import { WeaponAttributes } from '../models/Weapon';

const { Weapon, Review } = db;

const LoginController = {
  async getWeapon(req: Request, res: Response) {
    const weapon = await Weapon.findByPk(req.params.id);

    if (!weapon) {
      return res.status(404).json({ error: 'weapon not found' });
    }
    return res.json(weapon);
  },

  async sendRating(req: Request, res: Response) {
    const { rating } = req.body;
    const { id } = req.params;
    const weapon = Weapon.findByPk(id);

    if (!weapon) {
      return res.status(404).json({ error: 'weapon not found' });
    }
  },
};

export default LoginController;
