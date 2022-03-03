import {
  Model,
  Sequelize,
  DataTypes,
} from 'sequelize';
class User extends Model {
  declare id: number;
  declare username: string;
  declare pasword_hash: string;

  static init(sequelize) {
    super.init({
      username: DataTypes.STRING
    }, sequelize)
  }
}

export default User;
