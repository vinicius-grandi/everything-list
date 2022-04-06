import axios, { AxiosResponse } from 'axios';
import { FormData } from 'formdata-node';
import type { Request, Response } from 'express';
import db from '../models';

const { User } = db;

type ImgbbResponse = {
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

const UserController = {
  async createProfilePicture(req: Request, res: Response) {
    const { profilePicture } = req.files as any;

    const body = new FormData();
    body.set('key', process.env.IMGBB_API_KEY ?? '');
    body.append('image', profilePicture);

    const response: AxiosResponse<ImgbbResponse> = await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    });

    if (response.status !== 200) {
      return res.json({ error: 'could not upload picture image' });
    }

    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return { error: 'user not found' };
    }

    await user.update({ profile_picture: response.data.url });

    return res.json(response.data.url);
  },
};

export default UserController;
