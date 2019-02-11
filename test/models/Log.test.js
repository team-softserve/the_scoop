require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Log = require('../../lib/models/Log');
const { Types } = require('mongoose');

describe('Log Tests', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => {
    const log = new Log({
      place_id: '1234',
      name: 'Portland Creamery',
      user: Types.ObjectId(),
      rating: { price: 4, vibe: 4, flavor: 5 },
      tags: ['organic', 'dairy-free'],
      price: 3
    });
    
    expect(log.toJSON()).toEqual({
      place_id: '1234',
      name: 'Portland Creamery',
      user: expect.any(Types.ObjectId),
      rating: { price: 4, vibe: 4, flavor: 5 },
      tags: ['organic', 'dairy-free'],
      price: 3,
      _id: expect.any(Types.ObjectId)
    });
  });
});
