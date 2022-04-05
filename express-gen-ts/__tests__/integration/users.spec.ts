import request from 'supertest';
import redisClient from '../../src/redisConfig';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import db from '../../src/app/models';
import type { UserAttributes } from '../../src/app/models/User';

describe('users', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should change profile picture from logged user', async () => {
    const user = userInputs();
    const agent = request.agent(app);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    await agent.post('/signup').send(user);

    const response = await agent.post('/profiles/api/0').send({
      profilePicture: file,
    });
    expect(response.body.username).toBe(user.username);
  });
});
