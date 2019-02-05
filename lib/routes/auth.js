const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password, zipcode, keywords } = req.body;
    User
      .create({ username, password, zipcode, keywords })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { username, password, zipcode } = req.body;
    User.findOne({ username, zipcode })
      .then(user => {
        if(!user) {
          return next(new HttpError(401, 'Invalid username or password'));
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, correct]) => {
        if(correct) {
          res.send({ user, token:user.authToken() });
        }
        else {
          next(new HttpError(401, 'Invalid username or password'));
        }
      })
      .catch(next);
  });

