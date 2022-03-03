import {
  Model,
  Sequelize,
  DataTypes,
  ModelStatic,
  ModelAttributes,
  Attributes,
} from 'sequelize';

class User extends Model {
  declare id: number;
  declare username: string;
  declare pasword_hash: string;

  public static init(sequelize: Sequelize) {
    const attributes = {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
    };

    return this.init(attributes, {
        sequelize
    });
  }
}

export default User;
