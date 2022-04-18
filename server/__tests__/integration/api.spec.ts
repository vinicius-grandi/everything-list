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
  it('should retrieve books from route /books/api using 3rd party api', async () => {
    const response = await request(app).get('/books/api/');
    expect(response.body.data[0].name).toBe(
      'A Study of Income and Expenditures in Sixty Colleges. Year 1953-54',
    );
  });
});
