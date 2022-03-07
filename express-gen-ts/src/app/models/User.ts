import {
  Model,
} from 'sequelize';
import bcrypt from 'bcryptjs';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  password_hash: string;
  checkPassword(password: string): Promise<Boolean>;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    password_hash!: string;

    checkPassword(password: string) {
      return bcrypt.compare(password, this.password_hash);
    }
  }

    const attributes = {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    };

    User.init(attributes, {
        sequelize,
        tableName: "users",
        hooks: {
          beforeSave: async (user: any) => {
            if (user.password) {
              const passwordHash = await bcrypt.hash(user.password, 8);
              user.password_hash = passwordHash;
            }
          },
    }});
  return User;
}
