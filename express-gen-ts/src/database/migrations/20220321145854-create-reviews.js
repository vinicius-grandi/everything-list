module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      list_name: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'lists',
          key: 'list_name',
        },
      },
      item_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reviews');
  },
};
