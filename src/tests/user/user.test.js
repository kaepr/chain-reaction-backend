import supertest from 'supertest';
// import User from '../../models/User';
import app from '../../app';
// eslint-disable-next-line import/named
import { setupDB } from '../../setup-test';

const request = supertest(app);

setupDB();

describe('User Data', () => {
  test('Unauthorized User', async () => {
    const res = await request.get('/api/user/me');
    expect(res.status).toBe(401);
  });

  test('Get User Data', async () => {
    const tokens = await request.post('/api/auth/register').send({
      username: 'Test User',
      password: '123456',
      email: 'a@a.com',
    });

    const res = await request
      .get('/api/user/me')
      .set('authorization', `Bearer ${tokens.body.accessToken}`);

    expect(res.status).toBe(200);

    expect(res.body.userData).toHaveProperty('_id');
    expect(res.body.userData).toHaveProperty('email');
    expect(res.body.userData).toHaveProperty('username');
  });
});
