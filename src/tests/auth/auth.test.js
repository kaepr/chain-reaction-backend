import supertest from 'supertest';
import User from '../../models/User';
import app from '../../app';
// eslint-disable-next-line import/named
import { setupDB } from '../../setup-test';

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

  test('Register User Invalid Input', async () => {
    const res = await request.post('/api/auth/register').send({
      username: 'Test User',
      password: '123456',
      //   email: 'aa.com',
    });

    expect(res.status).toBe(400);
  });

  test('Login User', async () => {
    const email = 'a@a.com';
    const password = '123456';
    const username = 'Test User';

    await request.post('/api/auth/register').send({
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

    expect(res.status).toBe(200);
  });

  test('Login User Invalid Input', async () => {
    const email = 'a@a.com';
    const password = '123456';
    const username = 'Test User';

    await request.post('/api/auth/register').send({
      username,
      password,
      email,
    });

    const allUsers = await User.find();
    expect(allUsers.length).toBe(1);

    const res = await request.post('/api/auth/login').send({
      password,
    });

    expect(res.status).toBe(400);
  });

  test('Login User Wrong Email', async () => {
    let email = 'a@a.com';
    const password = '123456';
    const username = 'Test User';

    await request.post('/api/auth/register').send({
      username,
      password,
      email,
    });

    const allUsers = await User.find();
    expect(allUsers.length).toBe(1);

    email = 'abc@gmail.com';

    const res = await request.post('/api/auth/login').send({
      password,
      email,
    });

    expect(res.status).toBe(404);
  });

  test('Login User Wrong Password', async () => {
    const email = 'a@a.com';
    let password = '123456';
    const username = 'Test User';

    await request.post('/api/auth/register').send({
      username,
      password,
      email,
    });

    const allUsers = await User.find();
    expect(allUsers.length).toBe(1);

    password = '1234567';

    const res = await request.post('/api/auth/login').send({
      password,
      email,
    });

    expect(res.status).toBe(401);
  });
});
