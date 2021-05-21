import supertest from 'supertest';
import User from '../models/User';
import app from '../app';
import { setupDB } from '../setup-test';

const request = supertest(app);

// beforeEach(async () => {
//   await mongoose.connect(`${process.env.MONGO_URI_STRING_TEST}`, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// async function removeAllCollections() {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName];
//     await collection.deleteMany();
//   }
// }

// afterEach(async () => {
//   client.end(true);
//   await removeAllCollections();
// });

// afterEach(async () => {});

setupDB();

describe('User Login and Registration', () => {
  test('Register User', async () => {
    const res = await request.post('/api/auth/register').send({
      username: 'Test User',
      password: '123456',
      email: 'a@a.com',
    });

    console.log('res', res.body);

    expect(res.status).toBe(200);
  });
});
