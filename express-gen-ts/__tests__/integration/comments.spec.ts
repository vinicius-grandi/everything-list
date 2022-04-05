import request from 'supertest';
import truncate from '../utils/truncate';
import factories from '../utils/factories';
import app from '../../src/app';
import type { ReviewAttributes } from '../../src/app/models/Review';
import redisClient from '../../src/redisConfig';
import { UserAttributes } from '../../src/app/models/User';

describe('reviews', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should get comments from a specific item', async () => {
    await factories.create('Anime', {
      id: 1,
    });
    await factories.create('List', {
      list_name: 'animes',
    });
    const user: UserAttributes = await factories.create('User');
    const review: Partial<ReviewAttributes> = await factories.create('Review', {
      list_name: 'animes',
    });

    const response = await request(app).get('/animes/api/1/comments');

    expect(response.body[0].message).toBe(review.message);
    expect(response.body[0].review_user.username).toBe(user.username);
    expect(response.body[0].review_user.id).toBeUndefined();
  });
});
