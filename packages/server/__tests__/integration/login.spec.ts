import request from 'supertest';
import redisClient from '../../src/redisConfig';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import db from '../../src/app/models';
import type { UserAttributes } from '../../src/app/models/User';
import {
  logoutRoute,
  signupRoute,
  loginRoute,
  isUserAuthRoute,
} from '../utils/routes';

describe('Login', () => {
  beforeEach(async () => {
    await redisClient.flushall();
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should return info from model instance/save', async () => {
    const user: UserAttributes = await factories.create('User');

    expect(typeof user.username).toBe('string');
  });

  it('should return status 200 from route /signup', async () => {
    const response = await request(app).post(signupRoute).send(userInputs());

    expect(response.status).toBe(200);
  });

  it('should create a new user from route /signup', async () => {
    const user = userInputs();

    await request(app).post(signupRoute).send(user);

    const getUser = await db.User.findOne({
      where: { username: user.username },
    });

    expect(getUser).not.toBeNull();
  });

  it('should not create a new user from route /signup when is a bad request', async () => {
    const response = await request(app).post(signupRoute).send({
      username: 'jaimin',
      email: 'jungcook@gmail.com',
    });

    expect(response.status).toBe(400);
  });

  it('should not create two users with the same email', async () => {
    const user = userInputs();

    await request(app).post(signupRoute).send(user);

    const response = await request(app)
      .post(signupRoute)
      .send({ username: 'jo', email: user.email, password: 'ajAS12!@' });

    expect(response.status).toBe(409);
  });

  it('should login after signup', async () => {
    const response = await request(app).post(signupRoute).send(userInputs());

    expect(response.body.session).not.toBeUndefined();
  });

  it('should login when info is valid', async () => {
    const user: UserAttributes = await factories.create('User');

    const response = await request(app)
      .post(loginRoute)
      .send({ email: user.email, password: user.password });

    expect(response.body).not.toBeUndefined();
  });

  it('should not login if email is invalid', async () => {
    const user: UserAttributes = await factories.create('User');

    const response = await request(app)
      .post(loginRoute)
      .send({ email: 'jojo', password: user.password });

    expect(response.status).toBe(401);
  });

  it('should not login if password is invalid', async () => {
    const user: UserAttributes = await factories.create('User');

    const response = await request(app)
      .post(loginRoute)
      .send({ email: user.email, password: 'jojf' });

    expect(response.status).toBe(401);
  });
  it('/logout should logout user', async () => {
    const user = userInputs();
    const agent = request.agent(app);

    await agent.post(signupRoute).send(user);
    const response = await agent.get(logoutRoute);

    expect(response.headers['set-cookie']).toBe(undefined);
  });

  it('should return true when user is authenticated - route /api/is-user-auth', async () => {
    const agent = request.agent(app);

    const response = await agent.get(isUserAuthRoute);

    expect(response.body.auth).toBe(false);
  });
  it('should validate username, password and email - sign up', async () => {
    const user: UserAttributes = await factories.create('User');

    // invalid email
    const response = await request(app).post(signupRoute).send({
      username: user.username,
      email: 'jojo',
      password: user.password,
    });
    expect(response.status).toBe(400);

    // username - max length is 15.
    const response2 = await request(app).post(signupRoute).send({
      username: 'abcdefghijklmnop',
      email: user.email,
      password: user.password,
    });
    expect(response2.status).toBe(400);

    // password - it must have at least 2 special characters(!@#$%&*()+_-), 2 uppercase letters, 2 lowercases and 2 numbers. Length - between 8 and 15 characters
    const response3 = await request(app).post(signupRoute).send({
      username: user.username,
      email: 'jojo@gmail.com',
      password: 'asf1',
    });
    expect(response3.status).toBe(400);
  });
});
