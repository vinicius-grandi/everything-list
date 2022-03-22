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
    const { userId } = req.session;
    const weapon = await Weapon.findByPk(id);
    const info = {
      user_id: userId,
      list_name: 'weapons',
      item_id: id,
    };

    if (!weapon) {
      return res.status(404).json({ error: 'weapon not found' });
    }

    await Review.create({
      user_id: userId,
      list_name: 'weapons',
      item_id: id,
      message: '',
      rating,
    });

    const count = await Review.count({
      where: {
        ...info,
      },
    });

    const sum = await Review.sum('rating', {
      where: {
        ...info,
      },
    });

    await weapon.update({
      rating: (sum / count).toFixed(2),
    });

    return res.json(weapon);
  },
};

export default LoginController;
