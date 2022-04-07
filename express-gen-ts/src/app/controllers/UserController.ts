import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import type { Request, Response } from 'express';
import logger from 'jet-logger';
import db from '../models';

const { User } = db;

type ImgbbResponse = {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    size: number;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  status: number;
  success: boolean;
};

const UserController = {
  async getUserInfo(req: Request, res: Response) {
    const { user } = req.session;

    return res.json(user);
  },

  async updateProfilePicture(req: Request, res: Response) {
    const { profilePicture } = req.files as any;
    const body = new FormData();
    body.append('key', process.env.IMGBB_API_KEY ?? '');
    body.append('image', profilePicture.data.toString('base64'));

    try {
      const response: AxiosResponse<ImgbbResponse> = await axios({
        method: 'post',
        url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        data: body,
        headers: body.getHeaders(),
      });
      if (response.status !== 200) {
        return res
          .status(400)
          .json({ error: 'could not upload picture image' });
      }

      // finding and updating user
      const user = await User.findByPk(req.session.userId);
      await user.update({ profile_picture: response.data.data.url });

      return res.json(response.data.data.url);
    } catch (error) {
      logger.err(error.response.data);
    }

    return res.status(400).json({ error: 'could not upload picture image' });
  },
};

export default UserController;
