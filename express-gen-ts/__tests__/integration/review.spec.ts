import request from 'supertest';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import type { WeaponAttributes } from '../../src/app/models/Weapon';
import type { UserAttributes } from '../../src/app/models/User';

describe('reviews', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  it('should get all info about weapon from item details page', async () => {
    const weapon: WeaponAttributes = await factories.create('Weapon');

    const response = await request(app).get('/weapons/1');

    expect(response.body.name).toBe(weapon.name);
  });
  it('should not let you rate weapon when not logged in', async () => {
    await factories.create('Weapon');
    const response = await request(app).post('/weapons/1').send({
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
    await factories.create('List');
    const user = userInputs();
    const agent = request.agent(app);
    const rating = 2;

    await agent.post('/signup').send(user);

    const response = await agent.post('/weapons/1').send({
      rating,
    });
    expect(response.body.rating).toBe(rating.toFixed(2));
  });
});
