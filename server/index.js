'use strict';
const next = require('next');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const indexRoute = require('./route/index');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev, dir: process.env.CLIENT_DIR || './client' });
const handle = app.getRequestHandler();
const server = express();

/**
 * Cookie Parser
 */
server.use(cookieParser());

/**
 * Request compression (gzip)
 */
server.use(compression());

/**
 * Avilable next with response
 */
server.use(function (req, res, next) {
  res.next = app;
  return next();
});

/**
 * Helmet helps you secure your Express
 * apps by setting various HTTP headers
 */
server.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

/**
 * Routes middleware
 */
server.use('/', indexRoute);

/**
 * Server block
 */
function startServer() {
  const port = process.env.PORT || 3000;
  app
    .prepare()
    .then(() => {
      server.get('*', (req, res) => {
        return handle(req, res);
      });
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch((ex) => {
      console.error(ex.stack);
      setTimeout(() => {
        console.log('> Server trying to restart after crash');
        return startServer();
      }, 5000);
      process.exit(1);
    });
}
startServer();

module.exports = server;
