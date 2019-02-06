//add mock data const { getUsers, getToken }
const request = require('supertest');
const app = require('../../lib/app');

describe('logs', () => {
  it('creates a log', () => {
    const createdUsers = getUsers();
    return request(app)
      .post('')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({ place_id: '1234', name: 'Cold Stone Creamery', tags:['dairy- free', 'organic'] })
      .then(res => {
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
  it('gets all logs', () => {
    
  });
  
  it('gets a log by id', () => {

  });

});
