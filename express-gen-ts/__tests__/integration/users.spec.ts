import request from 'supertest';
import redisClient from '../../src/redisConfig';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import db from '../../src/app/models';
import type { UserAttributes } from '../../src/app/models/User';

describe('users', () => {
  it('should get info from logged user in route profiles/api/0', async () => {
    const user = userInputs();
    const agent = request.agent(app);

    await agent.post('/signup').send(user);

    const response = await agent.get('/profiles/api/0');
    expect(response.body.username).toBe(user.username);
  });
});
