import dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';

dotenv.config({
  path: process.env.NODE_ENV === 'test'
    ? './.test.env'
    : './.env',
});

const dialect: Dialect = 'mysql';

export default {
  database: 'everyting-list',
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  host: process.env.DB_HOST!,
  dialect: dialect,
  define: {
    timestamps: true,
    underscored: true,
  }
};
