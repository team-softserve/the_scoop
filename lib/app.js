const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');

app.use(express.json());
app.use(connection);

app.use(notFound);
app.use(handler);

module.exports = app;
