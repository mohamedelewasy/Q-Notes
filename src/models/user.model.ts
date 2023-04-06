import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { User } from '../types/schema';

class UserModel extends Model implements User {
  id!: string;
  email!: string;
  password!: string;
  isActive!: boolean;
  isAdmin!: boolean;
  token!: string;
  verificationCode!: string;
  createdAt!: Date;
}

UserModel.init(
  {
    id: { type: DataTypes.UUIDV4, primaryKey: true },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: { msg: 'invalid email format' } },
    },
    password: { type: DataTypes.STRING, allowNull: true },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 'false' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 'false' },
    token: { type: DataTypes.STRING },
    verificationCode: { type: DataTypes.STRING },
  },
  { createdAt: true, updatedAt: false, sequelize, tableName: 'users' }
);

UserModel.sync();
export default UserModel;
