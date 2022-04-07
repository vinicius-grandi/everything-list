import request from 'supertest';
import redisClient from '../../src/redisConfig';
import truncate from '../utils/truncate';
import { userInputs } from '../utils/factories';
import app from '../../src/app';

describe('users', () => {
  beforeEach(async () => {
    await redisClient.flushall();
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should allow user change your profile picture', async () => {
    const user = userInputs();
    const agent = request.agent(app);

    await agent.post('/signup').send(user);

    const response = await agent
      .put('/profiles/api/0')
      .attach('profilePicture', './test.png');

    const regex = /^(https:\/\/i\.ibb\.co\/).*/;

    expect(response.body).toMatch(regex);
  });
  it('should get info from logged user ', async () => {
    const user = userInputs();
    const agent = request.agent(app);

    await agent.post('/signup').send(user);

    const response = await agent.get('/profiles/api/0');

    expect(response.status).toBe(200);
    expect(response.body.password).toBeUndefined();
    expect(response.body.username).toBe(user.username);
  });
});
