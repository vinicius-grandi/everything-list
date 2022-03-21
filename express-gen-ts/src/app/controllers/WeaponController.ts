import { Request, Response } from 'express';
import db from '../models';
import { WeaponAttributes } from '../models/Weapon';

const { Weapon } = db;

const LoginController = {
  async getWeapon(req: Request, res: Response) {
    const weapon = await Weapon.findByPk(req.params.id);

    if (!weapon) {
      return res.status(404).json({ error: 'weapon not found' });
    }
    return res.json(weapon);
  },
};

export default LoginController;
