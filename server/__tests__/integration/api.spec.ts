import request from 'supertest';
import truncate from '../utils/truncate';
import app from '../../src/app';
import redisClient from '../../src/redisConfig';

describe('api', () => {
  beforeEach(async () => {
    await redisClient.flushall();
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should retrieve anime from route /animes/api using 3rd party api', async () => {
    const response = await request(app).get('/animes/api/');
    expect(response.body.data[0].name).toBe('!NVADE SHOW!');
  });
});
