import { factory } from 'factory-girl';
import { faker } from '@faker-js/faker';
import db from '../../src/app/models';

const { User, Weapon, Review, List } = db;

// defining user factory for tests
factory.define('User', User, {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Weapon', Weapon, {
  name: faker.word.noun(10),
  imagePath: null,
  summary: faker.lorem.paragraph(1),
  synonyms: [faker.word.noun(10), faker.word.noun(10)],
});

factory.define('Review', Review, {
  user_id: 1,
  list_name: 'weapons',
  item_id: 1,
  message: faker.datatype.string(20),
  rating: faker.datatype.number({
    min: 0,
    max: 10,
  }),
});

factory.define('List', List, {
  list_name: 'weapons',
});

export const userInputs = () => ({
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
