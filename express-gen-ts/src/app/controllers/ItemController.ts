import { Request, Response } from 'express';
import sequelize from 'sequelize';
import db from '../models';

interface IUserReview {
  rating: string;
  message: string;
}

interface Params {
  id: string;
}

const { Review } = db;

const ItemController = {
  async getItem(req: Request, res: Response) {
    const listName = req.baseUrl.slice(1);
    const modelName = listName.charAt(0).toUpperCase() + listName.slice(1, -1);
    const item = await db[modelName].findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'item not found' });
    }
    return res.json(item);
  },

  async setItemRating(item: any, id: string, listName: string) {
    const info = {
      where: {
        list_name: listName,
        item_id: id,
      },
    };

    const totalAmount = await Review.findOne({
      ...info,
      attributes: [
        [sequelize.fn('avg', sequelize.col('rating')), 'total_rating'],
      ],
    });

    const {
      dataValues: { total_rating: totalRating },
    } = totalAmount;

    await item.update({
      rating: Number(totalRating).toFixed(2),
    });
  },

  async sendRating(req: Request<Params, unknown, IUserReview>, res: Response) {
    const listName = req.baseUrl.slice(1);
    const modelName = listName.charAt(0).toUpperCase() + listName.slice(1, -1);
    const { rating, message } = req.body;
    const { id } = req.params;
    const { userId } = req.session;
    const item = await db[modelName].findByPk(id);

    if (!item) {
      return res.status(404).json({ error: 'item not found' });
    }
    try {
      const review = await Review.create({
        user_id: userId,
        list_name: listName,
        item_id: id,
        message: message ?? '',
        rating: Number(rating).toFixed(2),
      });
      await this.setItemRating(item, id, listName);
      return res.json({ review, item });
    } catch (err) {
      return res.status(405).send(err.message);
    }
  },

  async updateRating(req: Request, res: Response) {
    const listName = req.baseUrl.slice(1);
    const modelName = listName.charAt(0).toUpperCase() + listName.slice(1, -1);
    const { rating, message } = req.body;
    const { id } = req.params;
    const { userId } = req.session;
    const item = await db[modelName].findByPk(id);
    const info = {
      where: {
        user_id: userId,
        list_name: listName,
        item_id: id,
      },
    };
    const review = await Review.findOne(info);

    try {
      await review.update({
        rating: Number(rating).toFixed(2),
        message: message ?? '',
      });
      await this.setItemRating(item, id, listName);
      return res.json(item);
    } catch (err) {
      return res.status(405).send(err.message);
    }
  },
};

export default ItemController;
