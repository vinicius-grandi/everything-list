import { Request, Response } from 'express';
import getModelName from '../../utils/db/getModelName';
import db from '../models';

const NoApiController = {
  async getAllItems(req: Request, res: Response) {
    const { baseUrl } = req;
    const modelName = getModelName(baseUrl);
    const items = await db[modelName].findAll();

    res.json(items);
  },
};

export default NoApiController;
