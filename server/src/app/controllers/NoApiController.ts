import { Request, Response } from 'express';
import getModelName from '../../utils/db/getModelName';
import db from '../models';

interface IQueryParams {
  page: 'string';
}

const NoApiController = {
  async getAllItems(
    req: Request<unknown, unknown, unknown, IQueryParams>,
    res: Response,
  ) {
    const { baseUrl } = req;
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const modelName = getModelName(baseUrl);

    const lastPage = Math.ceil((await db[modelName].count()) / 20);
    const items = await db[modelName].findAll({
      limit: 20,
      offset: page === 1 ? 0 : (page - 1) * 20,
    });

    if (!items) {
      return res.status(404).json({ error: 'no items' });
    }

    return res.json({
      pagination: {
        lastVisiblePage: lastPage,
      },
      data: items,
    });
  },
};

export default NoApiController;
