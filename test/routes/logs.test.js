const { getUsers, getToken, getLogs, getLog } = require('../../test/utils/dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

describe('Logs tests', () => {
  beforeAll(() => { 
    connect();
  });
  
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });
  
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it.only('creates a log', () => {
    const createdUsers = getUsers();
    return request(app)
      .post('/logs')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({ place_id: '1234', name: 'Cold Stone Creamery', user: createdUsers[0]._id, tags:['dairy-free', 'organic'] })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place_id: expect.any(String),
          name: expect.any(String),
          user: createdUsers[0]._id,
          rating: expect.any(Object),
          tags: expect.any([String]),
          price: expect.any(Number)
        });
      });
  });
  it('gets all logs', () => {
    return request(app)
      .get('/logs')
      .then(res => {
        return Promise.all([
          Promise.resolve(res.body),
          getLogs()
        ]);
      })
      .then(([body, logs]) => {
        expect(body).toHaveLength(logs.length);
      });
  });
  
  it('gets a log by id', () => {
    const createdUsers = getUsers();
    return getLog()
      .then(log => {
        console.log('Log', log);
        return Promise.all([
          Promise.resolve(log),
          request(app)
            .get(`/logs/${log._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
        ]);
      })
      /* eslint-disable-next-line */
      .then(([log, res]) => {
        console.log('res', res.body);
        expect(res.body).toEqual({
          _id: expect.any(String),
          place_id: expect.any(String),
          name: expect.any(String),
          user: createdUsers[0]._id.toString(),
          rating: expect.any(Number),
          tags: expect.any(String),
          price: expect.any(Number)
        });
      });
  });

  it('updates a log by id', () => {
    const createdUsers = getUsers();
    return getLog()
      .then(log => {
        return request(app)
          .put(`/logs/${log._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            rating: { flavor: 5 }
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place_id: expect.any(String),
          name: expect.any(String),
          user: createdUsers[0]._id.toString(),
          rating: { flavor: 5 },
          tags: expect.any(String),
          price: expect.any(Number),
          __v:0
        });
      });
  });

  it('deletes a log', () => {
    return getLog()
      .then(log => {
        return Promise.all([
          Promise.resolve(log._id),
          request(app)
            .delete(`/logs/${log._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({ deleted: 1 });
        return request(app)
          .get(`/logs/${_id}`)
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.status).toEqual(404);
      });
  });
});
