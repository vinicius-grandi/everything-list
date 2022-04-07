import request from 'supertest';
import truncate from '../utils/truncate';
import factories from '../utils/factories';
import app from '../../src/app';
import redisClient from '../../src/redisConfig';

describe('search', () => {
  beforeEach(async () => {
    await redisClient.flushall();
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
  it('should return only animes when a filter is active', async () => {
    await factories.create('Weapon', {
      name: 'jojo',
    });
    const response = await request(app).get('/find?q=jojo&f=an');
    expect(response.body[0].list_name).toBe('animes');
  });
});
