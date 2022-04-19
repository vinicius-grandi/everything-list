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
    expect(response.body[0].name).toBe(weapon1.name);
    expect(response.body[1].name).toBe(weapon2.name);
  });
});
