import { Model } from 'sequelize';

export interface WeaponAttributes {
  name: string;
  imagePath: string | null;
  summary: string;
  synonyms: string[];
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Weapon extends Model<WeaponAttributes> implements WeaponAttributes {
    name!: string;

    imagePath!: string | null;

    summary!: string;

    synonyms!: string[];

    rating!: number;
  }

  const attributes = {
    name: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    imagePath: DataTypes.STRING(50),
    summary: DataTypes.STRING(150),
    synonyms: DataTypes.ARRAY(DataTypes.TEXT),
    rating: DataTypes.DECIMAL(4, 2),
  };

  Weapon.init(attributes, {
    sequelize,
    tableName: 'weapons',
  });
  return Weapon;
};
