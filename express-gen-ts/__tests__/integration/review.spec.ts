import request from 'supertest';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import type { WeaponAttributes } from '../../src/app/models/Weapon';
import redisClient from '../../src/redisConfig';

describe('reviews', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should get all info about weapon from item details page', async () => {
    const weapon: WeaponAttributes = await factories.create('Weapon');

    const response = await request(app).get('/weapons/api/1');

    expect(response.body.name).toBe(weapon.name);
  });
  it('should not let you rate weapon when not logged in', async () => {
    await factories.create('Weapon');
    const response = await request(app).post('/weapons/api/1').send({
      rating: 2,
    });

    expect(response.status).toBe(401);
  });

  it('should create weapon review', async () => {
    await factories.create('Weapon');
    await factories.create('List');
    await factories.create('User');
    const rating = 1;
    const review = await factories.create('Review', {
      rating,
    });
    expect(review.rating).toBe(rating.toFixed(2));
  });
  it('should let you rate weapon when logged in', async () => {
    await factories.create('Weapon');
    try {
      await factories.create('List');
    } catch (err) {
      console.error(err.message);
    }
    const user = userInputs();
    const agent = request.agent(app);
    const rating = 2;
    const message = 'This is the best weapon';

    try {
      const r = await agent.post('/signup').send(user);
      console.log(r.body);
    } catch (error) {
      console.error(error.message);
    }

    const response = await agent.post('/weapons/api/1').send({
      rating,
      message,
    });
    expect(response.body.review.rating).toBe(rating.toFixed(2));
    expect(response.body.review.message).toBe(message);
  }, 100000);
  it('should not let you create a weapon twice or more', async () => {
    await factories.create('Weapon');
    await factories.create('List');
    const user = userInputs();
    const agent = request.agent(app);
    const rating = 2;

    await agent.post('/signup').send(user);

    await agent.post('/weapons/api/1').send({
      rating,
    });

    const response = await agent.post('/weapons/api/1').send({
      rating,
    });

    expect(response.status).toBe(405);
  });
  it('should let you update weapon rating', async () => {
    await factories.create('Weapon');
    await factories.create('List');
    const user = userInputs();
    const agent = request.agent(app);
    const rating1 = 9.5;
    const rating2 = 10;

    await agent.post('/signup').send(user);
    await agent.post('/weapons/api/1').send({
      rating: rating1,
    });

    const response = await agent.put('/weapons/api/1').send({
      rating: rating2.toFixed(2),
    });

    expect(response.body.rating).toBe(rating2.toFixed(2));
  });
  it('should average the item rating correctly when there is more than one user', async () => {
    await factories.create('Weapon');
    await factories.create('List');
    const user1 = userInputs();
    const user2 = userInputs();
    const agent = request.agent(app);
    const average = ((5 + 10) / 2).toFixed(2);

    await agent.post('/signup').send(user1);
    await agent.post('/weapons/api/1').send({
      rating: 5,
      message: 'jo',
    });
    await agent.get('/logout');
    await agent.post('/signup').send(user2);
    const response = await agent.post('/weapons/api/1').send({
      rating: 10,
      message: 'jojo',
    });

    expect(response.body.item.rating).toBe(average);
  });
  it('should let you rate anime when logged in', async () => {
    const { id } = await factories.create('Anime');
    await factories.create('List', {
      list_name: 'animes',
    });
    const user = userInputs();
    const agent = request.agent(app);
    const rating = 2;
    const message = 'This is the best weapon';

    await agent.post('/signup').send(user);

    const response = await agent.post(`/animes/api/${id}`).send({
      rating,
      message,
    });
    expect(response.body.review.rating).toBe(rating.toFixed(2));
    expect(response.body.review.message).toBe(message);
  });
});
