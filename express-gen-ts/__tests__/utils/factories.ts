import db from '../../src/app/models';
const { User } = db;
import { factory } from 'factory-girl';
import { faker } from '@faker-js/faker';

// defining user factory for tests
factory.define('User', User, {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
