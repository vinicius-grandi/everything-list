module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.STRING(12),
        primaryKey: true,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
        default: Number(0).toFixed(2),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('books');
  },
};
