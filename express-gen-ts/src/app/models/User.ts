import {
  Model,
  Sequelize,
  DataTypes,
} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  declare username: string;
  declare password: string;
  declare email: string;
  declare password_hash: string;

  public static initializate(sequelize: Sequelize) {
    const attributes = {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
    };

    this.beforeCreate(async (user: User) => {
     const passwordHash = await bcrypt.hash(user.password, 8);
      user.password_hash = passwordHash;
    });

    return this.init(attributes, {
        sequelize
    });
  }
}

export default User;
