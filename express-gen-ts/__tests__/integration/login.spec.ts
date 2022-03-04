import truncate from '../utils/truncate';
import userFactory from '../utils/factories';
import request from 'supertest';
import app from '../../src/app';
import { UserAttributes } from '../../src/app/models/User'

describe('Login', () => {
  beforeEach(async () => await truncate(), 15000);
  it('should return info from model instance/save', async () => {
    const user: UserAttributes = await userFactory.create('User');

    expect(typeof user.username).toBe('string');
  });

  it('should create user from route /register', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'jaimin',
        email: 'jungcook',
        password: 'jimin',
      });

      expect(response.status).toBe(200);
  });
});
