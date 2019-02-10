const { getUser, getToken, getLog } = require('../../test/utils/dataHelpers');
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

  it('gets all logs', () => {
    return request(app)
      .get('/logs')
      .set('Authorization', `Bearer ${getToken()}`)
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });
  
  it('gets a log by id', () => {
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
          user: expect.any(Object),
          rating: expect.any(Object),
          tags: expect.any(Array),
          price: expect.any(Number)
        });
      });
  });

  it('updates a log by id', () => {
    return getLog()
      .then(log => {
        return request(app)
          .patch(`/logs/${log._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ name: log.name }); 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          place_id: expect.any(String),
          name: expect.any(String),
          user: expect.any(Object),
          rating: expect.any(Object),
          tags: expect.any(Array),
          price: expect.any(Number)
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
      .then(([log, res]) => {
        console.log('Log', log);
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
