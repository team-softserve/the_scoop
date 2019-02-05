require('dotenv').config();
const connect = require('../lib/utils/connect');

const request = require('supertest');
const mongoose = require('mongoose');
// const User = require('../lib/models/User');
const app = require('../lib/app');

describe('app', () => {
  beforeAll(() => { 
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can /signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'user1', password: 'password', zipcode: '97101', keywords: ['dairy-free', 'organic'] })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'user1',
            zipcode: '97101',
            keywords: ['dairy-free', 'organic']
          },
          token: expect.any(String)
        });
      });
  });

});


