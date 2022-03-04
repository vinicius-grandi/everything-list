import truncate from '../utils/truncate';
import userFactory from '../utils/factories';
import request from 'supertest';
import app from '../../src/app';
import db from '../../src/app/models';
import { UserAttributes } from '../../src/app/models/User'

describe('Login', () => {
  beforeEach(async () => await truncate(), 15000);
  it('should return info from model instance/save', async () => {
    const user: UserAttributes = await userFactory.create('User');

    expect(typeof user.username).toBe('string');
  });

  it('should return status 200 from route /register', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'jaimin',
        email: 'jungcook',
        password: 'jimin',
      });

      expect(response.status).toBe(200);
  });

  it('should create a new user from route /register', async () => {
    await request(app)
      .post('/register')
      .send({
        username: 'jaimin',
        email: 'jungcook',
        password: 'jimin',
      });

    const user = await db.User.findOne({
      where: { username: 'jaimin' }
    });

    expect(user).not.toBeNull();
  });

  it('should not create a new user from route /register when is a bad request', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'jaimin',
        email: 'jungcook@gmail.com',
      });

    expect(response.status).toBe(400);
  });

  it('should not create two users with the same email', async () => {
    await request(app)
      .post('/register')
      .send({
        username: 'jaimin',
        email: 'jungcook@gmail.com',
        password: 'bobobo',
      });

    const response = await request(app)
      .post('/register')
      .send({
        username: 'jaimin',
        email: 'jungcook@gmail.com',
      });

    expect(response.status).toBe(409);
  });
});
