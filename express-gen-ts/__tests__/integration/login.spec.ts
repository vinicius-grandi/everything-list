import User from '../../src/app/models/User';
import '../../src/database'
import truncate from '../utils/truncate';

describe('Login', () => {
  it('should return info from model instance', async () => {
    const user = await User.create({
      username: 'tet',
      email: 'tete@gmail.com',
      password: '12345678',
    });

    console.log(user)

    expect(user.username).toBe('tete');
  });
});
