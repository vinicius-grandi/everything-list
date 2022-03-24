import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  password_hash: string;
  checkPassword(password: string): Promise<boolean>;
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

    static associate(models: any) {
      this.hasMany(models.Review, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  const attributes = {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
  };

  User.init(attributes, {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeSave: async (user: any) => {
        if (user.password) {
          const u = user;
          const passwordHash = await bcrypt.hash(user.password, 8);
          u.password_hash = passwordHash;
        }
      },
    },
  });
  return User;
};
