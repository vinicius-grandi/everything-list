import { Model } from 'sequelize';

export interface MangaAttributes {
  id: number;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Manga extends Model<MangaAttributes> implements MangaAttributes {
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

  Manga.init(attributes, {
    sequelize,
    tableName: 'mangas',
  });
  return Manga;
};
