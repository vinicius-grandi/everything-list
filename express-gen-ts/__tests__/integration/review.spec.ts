import request from 'supertest';
import truncate from '../utils/truncate';
import factories, { userInputs } from '../utils/factories';
import app from '../../src/app';
import db from '../../src/app/models';
import { WeaponAttributes } from '../../src/app/models/Weapon';

describe('reviews', () => {
  beforeEach(async () => {
    await truncate();
  }, 15000);
  it('should get all info about weapon from item details page', async () => {
    const weapon: WeaponAttributes = await factories.create('Weapon');

    const response = await request(app).get('/weapons/1');

    expect(response.body.name).toBe(weapon.name);
  });
});
