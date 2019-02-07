const Log = require('../../lib/models/Log');
const User = require('../../lib/models/User');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_LOGS = 10;

module.exports = ({ totalUsers = DEFAULT_TOTAL_USERS, totalLogs = DEFAULT_TOTAL_LOGS }) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({ email: `seed${i}@test.com`, password: 'password', zipcode: '97101' }))
  )
    .then(users => {
      return Promise.all(
        [...Array(totalLogs)].map(() => {
          return Log.create({
            place_id: chance.string(users),
            name: chance.string(users),
            user: chance.object(users),
            rating: chance.string(users),
            tags: chance.string(users),
            price: chance.string(users)
          });
        })
      );
    });
};
