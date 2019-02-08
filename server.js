require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

app.listen(7899, () => {
  // eslint-disable-next-line
  console.log('Server started on port 7899');
});
