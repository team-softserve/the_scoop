require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Log = require('../../lib/models/Log');
const { Types } = require('mongoose');

const createLog = (log) => {
  return request(app)
    .post('/logs')
    .send({ 
      place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48', 
      user: Types.ObjectId(),
      rating: '3',
      tags: ['dairy-free', 'kid friendly'],
      price: 2
    })
    .then(res => res.body);
};

describe('logs', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });
  
  it('validates a good model', () => {
    return User.create({
      username: 'test',
      password: '234'
    })
      .then(createdUser => {
        return Post.create({
          user: createdUser._id.toString(),

  
         })
          .then(post => expect(post.toJSON()).toEqual({
            user: expect.any(Object),
            price: '2', 
            rating: '3',
            tags: [],
            _id: expect.any(Object)
          }));
      });
  });
});
 