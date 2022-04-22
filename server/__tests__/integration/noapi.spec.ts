import request from 'supertest';
import truncate from '../utils/truncate';
import factories from '../utils/factories';
import app from '../../src/app';
import redisClient from '../../src/redisConfig';
import type { WeaponAttributes } from '../../src/app/models/Weapon';

describe('noapi', () => {
  beforeEach(async () => {
    await redisClient.flushall();
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should get all weapons', async () => {
    const weapon1 = await factories.create<WeaponAttributes>('Weapon');
    const weapon2 = await factories.create<WeaponAttributes>('Weapon');
    const response = await request(app).get('/weapons/api/');
    expect(response.body.data[0].name).toBe(weapon1.name);
    expect(response.body.data[1].name).toBe(weapon2.name);
  });
  it('should get only 20 items per page', async () => {
    const maxItems = 41;
    const weapons = Array.from(Array(maxItems)).map(async () => {
      await factories.create<WeaponAttributes>('Weapon');
    });
    await Promise.all(weapons);
    const response = await request(app).get('/weapons/api/');
    expect(response.body.data.length).toBe(20);
    const response2 = await request(app).get('/weapons/api?page=2');
    expect(response2.body.data.length).toBe(20);
    const response3 = await request(app).get('/weapons/api?page=3');
    expect(response3.body.data.length).toBe(1);
    expect(response3.body.pagination.lastVisiblePage).toBe(3);
  });
});
