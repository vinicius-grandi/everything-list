// eslint-disable-next-line @typescript-eslint/no-var-requires
const weapon = require('./data/weapons.js');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('weapons', weapon, { ignoreDuplicates: true }),

  down: (queryInterface) =>
    queryInterface.bulkDelete('weapons', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }),
};
