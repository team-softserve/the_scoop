require('dotenv').config();
require('../../lib/utils/connect')();
const { dropCollection } = require('../utils/db');
const request = require('supertest');
const app = require('../../lib/app');
const { Types } = require('mongoose');
const Log = require('../../lib/models/Log');

jest.mock('../../lib/utils/google-map');


beforeEach(() => {
  return dropCollection('users');
});
beforeEach(() => {
  return dropCollection('logs');
});

let createdUsers;
let createdLogs;

let users = [
  {
    name: 'User1',
    email: 'user1@user1.com',
    zipcode: '97202',
    clearPassword: 'abcd1',
    keywords: ['organic', 'cheap']
  },
  {
    name: 'User2',
    email: 'user2@user2.com',
    zipcode: '97203',
    clearPassword: 'abcd2',
    keywords: ['gourmet', 'art']
  },
  {
    name: 'User3',
    email: 'user3@user3.com',
    zipcode: '97209',
    clearPassword: 'abcd3',
    keywords: ['awesome', 'family']
  }
];

let logs = [
  {
    place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48',
    name: 'Ice Ice Baby',
    user: Types.ObjectId(),
    rating: '4',
    tags: ['cheap', 'quiet'],
    price: 1
  },
  {
    place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps73',
    name: 'Pearl Ice Cream',
    user: Types.ObjectId(),
    rating: 'disliked',
    tags: ['expensive', 'pretentious'],
    price: 3
  }
];

// let zipcodes = [
//   {
//     zipcode: 97202
//   },
//   {
//     zipcode: 94103
//   },
//   {
//     zipcode: 94610
//   }
// ];

const createUser = user => {
  return request(app)
    .post('/api/auth/signup')
    .send(user)
    .then(res => res.body);
};

const createLog = log => {
  return Log.create(log)
    .then(log => JSON.parse(JSON.stringify(log)));
};

const withToken = user => {
  return request(app)
    .post('/api/auth/signin')
    .send({ email: user.email, clearPassword: user.clearPassword })
    .then(({ body }) => body.token);
};

beforeEach(() => {
  return Promise.all(users.map(createUser)).then(userRes => {
    createdUsers = userRes;
  });
});

let token;

beforeEach(() => {
  return withToken(users[0]).then(createdToken => {
    token = createdToken;
  });
});

beforeEach(() => {
  return Promise.all(logs.map(createLog)).then(logRes => {
    createdLogs = logRes;
  });
});

const getUsers = () => createdUsers;
const getLogs = () => createdLogs;
const getToken = () => token;

module.exports = {
  getUsers,
  getLogs,
  getToken,
};
