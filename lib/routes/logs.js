const { Router } = require('express');
const Log = require('../models/Log');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { placeId, name, user, rating, tags, price } = req.body;
    Log
      .create({
        placeId,
        name,
        user,
        rating,
        tags,
        price
      })
      .then(log => res.send(log))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Log
      .find()
      .lean()
      .select({ __v: false })
      .then(listOfLogs => res.send(listOfLogs))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Log
      .findById(req.params.id)
      .populate('user', { user: true })
      .lean()
      .select({ __v: false })
      .then(log => res.send(log))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    const { name } = req.body;
    Log
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .populate('user', { user: true })
      .select({ __v: false })
      .then(log => res.send(log))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Log
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  })

  .get('/stats/price', (req, res, next) => {
    Log.getBestPrice()
      .then(shops => res.send(shops))
      .catch(next);

  });
