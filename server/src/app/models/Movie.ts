import { Model } from 'sequelize';

export interface MovieAttributes {
  id: string;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Movie extends Model<MovieAttributes> implements MovieAttributes {
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

  Movie.init(attributes, {
    sequelize,
    tableName: 'movies',
  });
  return Movie;
};
