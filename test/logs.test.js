const Log = require('../../lib/models/Log');
const { getErrors } = require('../util/helpers');
const { Types } = require('mongoose');

describe('log model', () => {
  it('validates a good model', () => {
    const data = {
      place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48', 
      user: Types.ObjectId(),
      rating: 'liked',
      tags: ['dairy-free', 'kid friendly'],
      price: 2
    };

    const log = new Log(data);
    const jsonLog = log.toJSON();
    expect(jsonLog).toEqual({ ...data, _id: expect.any(Object) });
  });

  it('fails when no required values are given', () => {
    const log = new Log({});

    const errors = getErrors(log.validateSync(), 5);
    expect(errors.place_id.properties.message).toEqual('place_id required');
    expect(errors.user.properties.message).toEqual('user required');
    expect(errors.tags.properties.message).toEqual('at least one tag required');
    expect(errors.price.properties.message).toEqual('price required 0-4');
  });
});
