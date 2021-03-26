const express = require('express');
const indexMiddleware = require('./middlewares/indexHandler');
const routingMiddleware = require('./middlewares/routingHandler');

const app = express();

indexMiddleware(app);
routingMiddleware(app);

module.exports = app;
