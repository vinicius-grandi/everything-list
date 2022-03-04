import { Sequelize } from 'sequelize';
import dbConfig from './config/config';
import User from 'src/app/models/User';

const connection = new Sequelize(dbConfig);

User.initializate(connection);

export default connection;
