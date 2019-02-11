require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./test/utils/seedData');

seedData({ totalUsers: 10, totalLogs: 10 })
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
