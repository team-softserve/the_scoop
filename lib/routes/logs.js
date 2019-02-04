const { Router } = require('express');
const Log = require('../models/Log');
const ensureAuth = require('../util/ensureAuth');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, company } = req.body;
    Log
      .create({ name, company })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    const { query } = req;
    Log.find(query)
      .select({ __v: false })
      .lean()
      .then(log => { 
      })
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    const { id } = req.params;
    Log.find().where('user').equals(id)
      .select({ __v: false })
      .lean()
      .then(logs => {
        res.json(logs);
      })
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
  });


