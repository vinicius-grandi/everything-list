import { Model } from 'sequelize';

export interface ListAttributes {
  list_name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class List extends Model<ListAttributes> implements ListAttributes {
    list_name!: string;

    static associate(models: any) {
      this.hasMany(models.Review, {
        foreignKey: 'list_name',
        as: 'list',
      });
    }
  }

  const attributes = {
    list_name: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
  };

  List.init(attributes, {
    sequelize,
    tableName: 'lists',
    timestamps: false,
  });
  return List;
};
