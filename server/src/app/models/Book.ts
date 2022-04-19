import { Model } from 'sequelize';

export interface BookAttributes {
  id: string;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model<BookAttributes> implements BookAttributes {
    id!: string;

    rating!: number;
  }

  const attributes = {
    id: {
      type: DataTypes.STRING(12),
      primaryKey: true,
    },
    rating: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
  };

  Book.init(attributes, {
    sequelize,
    tableName: 'books',
  });
  return Book;
};
