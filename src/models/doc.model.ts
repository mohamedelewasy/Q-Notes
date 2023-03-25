import path from 'path';
import { DataTypes, Model } from 'sequelize';

import { Doc } from '../../types/schema';
import { __BASEdIRECTORY } from '../app';
import sequelize from '../config/db';

class DocModel extends Model implements Doc {
  id!: string;
  pdf!: string;
  description!: string;
  educationLevel!: string;
  class!: string;
  semester!: string;
  title!: string;
  price!: number;
}

DocModel.init(
  {
    id: { type: DataTypes.UUIDV4, primaryKey: true },
    pdf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      get() {
        return path.join(__BASEdIRECTORY, `uploads/${this.getDataValue('pdf')}.pdf`);
      },
    },
    description: { type: DataTypes.STRING, allowNull: false },
    educationLevel: { type: DataTypes.STRING, allowNull: false },
    className: { type: DataTypes.STRING, allowNull: false },
    semester: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.NUMBER, allowNull: false },
  },
  { timestamps: true, sequelize, tableName: 'docs' }
);

DocModel.sync();
export default DocModel;
