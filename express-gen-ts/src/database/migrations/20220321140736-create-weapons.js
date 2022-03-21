module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weapons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      imagePath: {
        type: Sequelize.STRING(150),
      },
      summary: {
        type: Sequelize.STRING,
      },
      synonyms: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        default: Number('0.00'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('weapons');
  },
};
