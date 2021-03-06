import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import sharp from 'sharp';
import type { Request, Response } from 'express';
import logger from 'jet-logger';
import db from '../models';

interface IQueryParam {
  review: string;
}

const { User, Review } = db;

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
  async getUserInfo(
    req: Request<unknown, unknown, unknown, IQueryParam>,
    res: Response,
  ) {
    const { user, userId } = req.session;
    const { review } = req.query;

    if (review === 'false') {
      return res.json(user);
    }

    const reviews = await Review.findAll({ where: { user_id: userId } });

    return res.json({ ...user, reviews });
  },

  async updateProfilePicture(req: Request, res: Response) {
    const { profilePicture } = req.files as any;
    const body = new FormData();

    const image = sharp(profilePicture.data);
    const metadata = await image.metadata();

    const width = Number(metadata.width);
    const height = Number(metadata.height);
    const r = width / 2;
    const h = height / 2;
    const circleShape = Buffer.from(
      `<svg height="${height}" width="${width}"><circle cx="${r}" cy="${h}" r="${50}" /></svg>`,
    );

    const imageBuffer = await sharp(profilePicture.data)
      .composite([
        {
          input: circleShape,
          blend: 'dest-in',
        },
      ])
      .png()
      .toBuffer();

    const lastBuffer = await sharp(imageBuffer).trim().png().toBuffer();

    body.append('key', process.env.IMGBB_API_KEY ?? '');
    body.append('image', lastBuffer.toString('base64'));

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

      req.session.user = {
        ...req.session.user,
        profile_picture: response.data.data.url,
      };

      return res.json(response.data.data.url);
    } catch (error) {
      logger.err(error);
    }

    return res.status(400).json({ error: 'could not upload picture image' });
  },
};

export default UserController;
