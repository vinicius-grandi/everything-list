import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
     await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pasword_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface: QueryInterface) {
     await queryInterface.dropTable('users');
  }
};
