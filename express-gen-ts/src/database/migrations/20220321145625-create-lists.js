module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lists', {
      list_name: {
        primaryKey: true,
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('lists');
  },
};
