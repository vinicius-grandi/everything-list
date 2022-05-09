/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../../database/config/config.js');

const db: any = {};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname)
  .filter(
    (file: string) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === path.extname(__filename),
  )
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
