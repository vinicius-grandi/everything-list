import request from 'supertest';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import type { ReviewAttributes } from '../../src/app/models/Review';
import redisClient from '../../src/redisConfig';

describe('reviews', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it("should get comments from review's association", async () => {
    const { id } = await factories.create('Anime');
    await factories.create('List', {
      list_name: 'animes',
    });
    await factories.create('User');
    const review: Partial<ReviewAttributes> = await factories.create('Review', {
      list_name: 'animes',
    });

    const response = await request(app).get('/reviews/api?ln=animes&id=1');

    expect(response.body[0].message).toBe(review.message);
  });
});
