import { Request, Response } from 'express';
import sequelize from 'sequelize';
import db from '../models';

const { Weapon, Review } = db;

const LoginController = {
  async getWeapon(req: Request, res: Response) {
    const weapon = await Weapon.findByPk(req.params.id);

    if (!weapon) {
      return res.status(404).json({ error: 'weapon not found' });
    }
    return res.json(weapon);
  },

  async setWeaponRating(weapon: any, id: string) {
    const info = {
      where: {
        list_name: 'weapons',
        item_id: id,
      },
    };

    const totalAmount = await Review.findAll({
      ...info,
      attributes: [
        [sequelize.fn('avg', sequelize.col('rating')), 'total_rating'],
      ],
    });

    const [
      {
        dataValues: { total_rating: totalRating },
      },
    ] = totalAmount;

    await weapon.update({
      rating: Number(totalRating).toFixed(2),
    });
  },

  async sendRating(req: Request, res: Response) {
    const { rating, message } = req.body;
    const { id } = req.params;
    const { userId } = req.session;
    const weapon = await Weapon.findByPk(id);

    if (!weapon) {
      return res.status(404).json({ error: 'weapon not found' });
    }
    try {
      const review = await Review.create({
        user_id: userId,
        list_name: 'weapons',
        item_id: id,
        message: message ?? '',
        rating: Number(rating).toFixed(2),
      });
      await this.setWeaponRating(weapon, id);
      return res.json(review);
    } catch (err) {
      return res.status(405).send(err.message);
    }
  },

  async updateRating(req: Request, res: Response) {
    const { rating, message } = req.body;
    const { id } = req.params;
    const { userId } = req.session;
    const weapon = await Weapon.findByPk(id);
    const info = {
      where: {
        user_id: userId,
        list_name: 'weapons',
        item_id: id,
      },
    };
    const review = await Review.findOne(info);

    try {
      await review.update({
        rating: Number(rating).toFixed(2),
        message: message ?? '',
      });
      await this.setWeaponRating(weapon, id);
      return res.json(weapon);
    } catch (err) {
      return res.status(405).send(err.message);
    }
  },
};

export default LoginController;
