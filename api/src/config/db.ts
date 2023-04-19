import { Sequelize } from 'sequelize';

import { ENV } from './env';

const { HOST, DB, PORT, USER, PASSWORD } = ENV.POSTGRES;
const sequelize = new Sequelize(`postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`, {
  logging: false,
});

export default sequelize;
