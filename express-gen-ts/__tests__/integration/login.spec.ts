import request from 'supertest';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import db from '../../src/app/models';
import { UserAttributes } from '../../src/app/models/User';

describe('Login', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  it('should return info from model instance/save', async () => {
    const user: UserAttributes = await factories.create('User');

    expect(typeof user.username).toBe('string');
  });

  it('should return status 200 from route /signup', async () => {
    const response = await request(app).post('/signup').send(userInputs());

    expect(response.status).toBe(200);
  });

  it('should create a new user from route /signup', async () => {
    const user = userInputs();

    await request(app).post('/signup').send(user);

    const getUser = await db.User.findOne({
      where: { username: user.username },
    });

    expect(getUser).not.toBeNull();
  });

  it('should not create a new user from route /signup when is a bad request', async () => {
    const response = await request(app).post('/signup').send({
      username: 'jaimin',
      email: 'jungcook@gmail.com',
    });

    expect(response.status).toBe(400);
  });

  it('should not create two users with the same email', async () => {
    const user = userInputs();

    await request(app).post('/signup').send(user);

    const response = await request(app)
      .post('/signup')
      .send({ username: 'jo', email: user.email, password: 'o' });

    expect(response.status).toBe(409);
  });

  it('should login after signup', async () => {
    const response = await request(app).post('/signup').send(userInputs());

    expect(response.body.session).not.toBeUndefined();
  });

  it('should redirect to profile route after signup', async () => {
    const response = await request(app).post('/signup').send(userInputs());

    expect(response.redirect).toBe(true);
  });

  it('should login when info is valid', async () => {
    const user: UserAttributes = await factories.create('User');

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    expect(response.body).not.toBeUndefined();
  });

  it('should not login if email is invalid', async () => {
    const user: UserAttributes = await factories.create('User');

    const response = await request(app)
      .post('/login')
      .send({ email: 'jojo', password: user.password });

    expect(response.status).toBe(401);
  });

  it('should not login if password is invalid', async () => {
    const user: UserAttributes = await factories.create('User');

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: 'jojf' });

    expect(response.status).toBe(401);
  });

  it('/login should redirect to index if already logged in', async () => {
    const user = userInputs();
    const agent = request.agent(app);

    await agent.post('/signup').send(user);

    const response = await agent
      .post('/login')
      .send({ email: user.email, password: user.password });

    expect(response.redirect).toBe(true);
  });
});
