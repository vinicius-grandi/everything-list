import request from 'supertest';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import redisClient from '../../src/redisConfig';

describe('search', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should return items that is like the query', async () => {
    await factories.create('Weapon', {
      name: 'jojo',
    });

    const response = await request(app).get('/find?q=jojo');
    expect(response.body[0].name).toBe('jojo');
  });
});
