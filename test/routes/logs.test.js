const { getUsers, getUser, getToken, getLogs, getLog } = require('../../test/utils/dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('Logs tests', () => {
  it('creates a log', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/logs')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ 
            place_id: '1234', 
            name: 'Cold Stone Creamery', 
            tags:['dairy-free', 'organic'],
            price: 2,
            rating: { price: 3, vibe: 3, flavor: 3 },
            user: user._id, 
          })
          .then(res => {
            expect(res.body).toEqual({
              place_id: '1234',
              name: 'Cold Stone Creamery',
              tags: ['dairy-free', 'organic'],
              price: 2,
              rating: { price: 3, vibe: 3, flavor: 3 },
              _id: expect.any(String),
              user: expect.any(String)
            });
          });
      });
  });
  it.only('gets all logs', () => {
    return request(app)
      .get('/logs')
      .then(res => {
        return Promise.all([
          Promise.resolve(res.body),
          getLogs()
        ]);
      })
      .then(([body, logs]) => {
        console.log('!! has token', body);
        expect(body).toHaveLength(logs.length);
        logs.forEach(log => {
          delete log.__v;
          expect(body).toContainEqual({ ...log, user: { _id: log.user } });
        });
      });
  });
  
  it('gets a log by id', () => {
    const createdUsers = getUsers();
    return getLog()
      .then(log => {
        return Promise.all([
          Promise.resolve(log),
          request(app)
            .get(`/logs/${log._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
        ]);
      })
      /* eslint-disable-next-line */
      .then(([log, res]) => {
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
