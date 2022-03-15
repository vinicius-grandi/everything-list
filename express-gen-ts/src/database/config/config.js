/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

/**
 * @typedef { import("sequelize/types").Dialect } Dialect
 */

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? './.test.env' : './.env',
});

/** @const @type {Dialect} */
const dialect = 'postgres';

module.exports = {
  database: 'everyting-list',
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASS ?? '',
  logging: false,
  host: process.env.DB_HOST ?? '',
  dialect,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
