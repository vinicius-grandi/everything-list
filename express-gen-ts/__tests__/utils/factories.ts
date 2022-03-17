import { factory } from 'factory-girl';
import { faker } from '@faker-js/faker';
import db from '../../src/app/models';

const { User } = db;

// defining user factory for tests
factory.define('User', User, {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const userInputs = () => ({
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
