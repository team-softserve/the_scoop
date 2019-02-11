const { Router } = require('express');
const Log = require('../models/Log');
const { ensureAuth } = require('../middleware/ensureAuth');

const patcher = (body, fields) => {
  return Object.keys(body)
    .reduce((acc, key) => {
      if(fields.includes(key) && body[key]) {
        acc[key] = body[key];
      }
      return acc;
    }, {});
};

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { place_id, name, user, rating, tags, price } = req.body;
    Log
      .create({
        place_id,
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
    const patched = patcher(req.body, ['name']);
    Log
      .findByIdAndUpdate(req.params.id, patched, { new: true })
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
