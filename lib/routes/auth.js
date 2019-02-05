const { Router } = require('express');
const User = require('../models/User');
// const { HttpError } = require('../middleware/error');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password, zipcode, keywords } = req.body;
    User
      .create({ username, password, zipcode, keywords })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  });
