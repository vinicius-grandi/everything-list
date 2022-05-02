import { Model } from 'sequelize';

export interface AnimeAttributes {
  id: number;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Anime extends Model<AnimeAttributes> implements AnimeAttributes {
    id!: number;

    rating!: number;
  }

  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
  };

  Anime.init(attributes, {
    sequelize,
    tableName: 'animes',
  });
  return Anime;
};
