import { Doc } from '@english/shared';
import dotenv from 'dotenv';
import path from 'path';
import { DataTypes, Model } from 'sequelize';

import { __BASEdIRECTORY } from '../app';
import sequelize from '../config/db';

dotenv.config();

class DocModel extends Model implements Doc {
  id!: string;
  pdf!: string;
  thumbnail!: string;
  description!: string;
  educationLevel!: string;
  className!: string;
  semester!: string;
  title!: string;
  price!: number;
  updatedAt!: Date;
}

DocModel.init(
  {
    id: { type: DataTypes.UUIDV4, primaryKey: true },
    pdf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    educationLevel: {
      type: DataTypes.ENUM('secondary', 'prep', 'primary', 'kindergarten'),
      allowNull: false,
    },
    className: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'class must be between 1 and 6' },
        max: { args: [6], msg: 'class must be between 1 and 6' },
      },
    },
    semester: { type: DataTypes.ENUM('one', 'two'), allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.NUMBER, allowNull: false },
  },
  { timestamps: true, sequelize, tableName: 'docs' }
);

DocModel.sync();
export default DocModel;
