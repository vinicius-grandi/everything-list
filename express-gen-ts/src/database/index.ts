import { Sequelize } from 'sequelize';
import User from '../app/models/User';
const dbConfig = require('./config/config');

const connection = new Sequelize(dbConfig);

User.initializate(connection);

export default connection;
