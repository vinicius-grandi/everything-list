import db from '../../src/app/models';

const {
  sequelize: { models },
} = db;

export default () =>
  Promise.all(
    Object.keys(models).map((model) =>
      models[model].destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
        force: true,
      }),
    ),
  );
