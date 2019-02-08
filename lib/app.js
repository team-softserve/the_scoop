const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const { bearerToken } = require('./middleware/ensureAuth');

app.use(express.json());
app.use(bearerToken);
app.use(connection);
app.use('/auth', require('./routes/auth'));
app.use('/logs', require('./routes/logs'));
app.use(notFound);
app.use(handler);

module.exports = app;
