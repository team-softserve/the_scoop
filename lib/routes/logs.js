const { Router } = require('express');
const Log = require('../models/Log');
const { ensureAuth } = require('../middleware/ensureAuth');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log('******', req.user);
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
      .lean()
      .select({ __v: false })
      .then(log => res.send(log))
      .catch(next);
  })
  .put('/:id', ensureAuth, (req, res, next) => {
    const { id } = req.params;
    const { rating } = req.body;
    Log.findOneAndUpdate(
      { _id: id }, 
      { rating: rating },
      { new: true, runValidators: true })
      .then(result => {
        res.json(result);
      })
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Log.findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });
