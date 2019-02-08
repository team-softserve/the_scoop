require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');
const PORT = process.env.PORT || 7899;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Server started on port ', PORT);
});
