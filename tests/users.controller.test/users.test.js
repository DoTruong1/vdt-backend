
const {
  expect,
  describe,
  test,
  afterAll,
  beforeAll
} = require('@jest/globals');

const conn = require('../../config/conect.database');
const app = require('../../index');
// const AllModels = require('../../models');
const request = require('supertest')(app);

const USERS_API_PATH = process.env.API_PATH + '/users'
let UserData;

beforeAll(async () => await conn.dbConnect());
afterAll(async () => {
  try {
    await conn.dbDisconnect()
    // app.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
describe('User APIs Testing...', () => {
  test('List Users API...', async () => {
    const res = await request.get(USERS_API_PATH)
    expect(res.statusCode).toBe(200);
  });

  test('Create User API...', async () => {
    const res = await request.post(USERS_API_PATH)
      .send({
        name: 'Ramdom Name',
        school: 'Random School',
        gender: 'mail',
      });
    UserData = res.body.data
    console.log(res.body)
    expect(res.statusCode).toBe(200);
  });


  test('Get one user by Id API...', async () => {
    const res = await request.get(USERS_API_PATH + `/${UserData.id}`)
    expect(res.statusCode).toBe(200);
  });

  test('Update user info API', async () => {
    const res = await request.put(USERS_API_PATH + `/${UserData.id}`)
      .send({
        "name": "New Name",
        "school": "Dai hoc cong nghe",
        "gender": "male"
      })
    // expect(UserData.name).toEqual(res.body.data.name);
    expect(res.statusCode).toBe(200);
  });
  test('Delete user API', async () => {
    const res = await request.delete(USERS_API_PATH + `/${UserData.id}`)

    // expect(UserData.name).toEqual(res.body.data.name);
    expect(res.statusCode).toBe(200);
  });
});
