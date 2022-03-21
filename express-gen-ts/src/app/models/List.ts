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
    list_name: DataTypes.STRING(20),
  };

  List.init(attributes, {
    sequelize,
    tableName: 'lists',
  });
  return List;
};
