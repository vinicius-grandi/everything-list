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
        unique: true,
      },
      image_path: {
        type: Sequelize.STRING(250),
      },
      summary: {
        type: Sequelize.TEXT,
      },
      synonyms: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: Number('0.00'),
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
    await queryInterface.dropTable('weapons');
  },
};
