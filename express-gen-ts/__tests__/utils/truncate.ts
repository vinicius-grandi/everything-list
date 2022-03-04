import db from '../../src/app/models';
const { sequelize } = db;

export default () => {
  return Promise.all(Object.keys(
    (sequelize.models)
  ).map(
    (key) => {
      return sequelize.models[key].destroy({
        truncate: true,
        force: true,
      });
    }
  ));
};
