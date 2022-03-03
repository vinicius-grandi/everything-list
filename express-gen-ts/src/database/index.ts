import { Sequelize } from 'sequelize';
import dbConfig from './config/config';

const connection = new Sequelize(dbConfig);
