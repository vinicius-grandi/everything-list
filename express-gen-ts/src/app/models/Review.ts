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
    item_id: DataTypes.INTEGER,
    list_name: DataTypes.STRING(20),
    message: DataTypes.STRING(500),
    user_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
  };

  Review.init(attributes, {
    sequelize,
    tableName: 'reviews',
  });
  return Review;
};
