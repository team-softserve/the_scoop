require('dotenv').config();
const { bearerToken, ensureAuth } = require('../lib/middleware/ensureAuth');
const { tokenize } = require('../lib/utils/token');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {
    const req = {
      get: () => 'Bearer wxyz1234'
    };
    const next = jest.fn();

    bearerToken(req, {}, next);

    expect(req.token).toEqual('wxyz1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensure auth', () => {
    const token = tokenize({ email: 'user1' });
    const req = { token };
    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'user1' });
        expect(next).toHaveBeenCalled();
      });
  });
});
