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
  it('should retrieve books from page 2 on books route', async () => {
    const response = await request(app).get('/books/api?page=2');
    expect(response.body.data[0].name).toBe('A Rand Note');
    const response2 = await request(app).get('/books/api?page=3');
    expect(response2.body.data[0].name).toBe('Learning to Think in a Math Lab');
  });
  it('should retrieve a specific book when id is on path', async () => {
    const response = await request(app).get('/books/api/X9isv_S0aPYC');
    expect(response.body.data.volumeInfo.title).toBe(
      'A dictionary of informal Brazilian Portuguese',
    );
    expect(response.body.data.rating.toFixed(0)).toBe('0');
  });
});
