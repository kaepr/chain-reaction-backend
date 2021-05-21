import supertest from 'supertest';
import User from '../models/User';
import app from '../app';
// eslint-disable-next-line import/named
import { setupDB } from '../setup-test';

const request = supertest(app);

setupDB();

describe('User Login and Registration', () => {
  test('Register User', async () => {
    const res = await request.post('/api/auth/register').send({
      username: 'Test User',
      password: '123456',
      email: 'a@a.com',
    });

    const allUsers = await User.find();
    expect(allUsers.length).toBe(1);
    expect(res.status).toBe(200);
  });

  test('Login User', async () => {
    const email = 'a@a.com';
    const password = '123456';
    const username = 'Test User';

    const token = await request.post('/api/auth/register').send({
      username,
      password,
      email,
    });

    const allUsers = await User.find();
    expect(allUsers.length).toBe(1);

    const res = await request.post('/api/auth/login').send({
      password,
      email,
    });
    //   .set('Authorization', `Bearer ${token.accessToken}`);

    console.log('res', res);

    expect(res.status).toBe(200);
  });
});
