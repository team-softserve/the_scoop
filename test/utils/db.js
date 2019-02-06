const connect = require('../../lib/utils/connect');
connect('mongodb://localhost:27017/scoops');
const mongoose = require('mongoose');

afterAll(() => {
  return mongoose.disconnect();
});

module.exports = {
  dropCollection(name) {
    return mongoose.connection.dropCollection(name)
      .catch(err => {
        if(err.codeName !== 'NamespaceNotFound') throw err;
      });
  }
};
