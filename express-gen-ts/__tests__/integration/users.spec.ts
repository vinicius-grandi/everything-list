import request from 'supertest';
import redisClient from '../../src/redisConfig';
import truncate from '../utils/truncate';
import { userInputs } from '../utils/factories';
import app from '../../src/app';

describe('users', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should change profile picture from logged user', async () => {
    const user = userInputs();
    const agent = request.agent(app);

    await agent.post('/signup').send(user);

    const response = await agent
      .post('/profiles/api/0')
      .attach('profilePicture', './test.png');

    expect(response.body).toBe(/(https:\/\/i.ibb.co\/)*/);
  });
});
