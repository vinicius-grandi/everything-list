import { Model } from 'sequelize';

export interface ReviewAttributes {
  user_id: number;
  list_name: string;
  item_id: string;
  message: string;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    user_id!: number;

    list_name!: string;

    item_id!: string;

    message!: string;

    rating!: number;

    static associate(models: any) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'review_user',
      });

      this.belongsTo(models.List, {
        foreignKey: 'list_name',
        as: 'review_list',
      });
    }
  }

  const attributes = {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    list_name: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    item_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(12),
    },
    message: DataTypes.STRING(500),
    rating: DataTypes.DECIMAL(4, 2),
  };

  Review.init(attributes, {
    sequelize,
    tableName: 'reviews',
    hooks: {
      beforeSave: async (user: any) => {
        if (user.item_id) {
          const u = user;
          u.item_id = String(user.item_id);
        }
      },
    },
  });
  return Review;
};
