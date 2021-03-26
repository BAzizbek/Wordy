module.exports = function(app) {
  const express = require('express');
  const morgan = require('morgan');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const FileStore = require('session-file-store')(session);
  const path = require('path')

  const dbConnect = require('./dbConnect');

  app.use(morgan('dev'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    session({
      store: new FileStore(),
      key: 'user_sid',
      secret: 'something',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 1000 * 60 * 60 // an hour
      }
    })
  );

  app.use(express.static(path.join(__dirname, '..', "public")));

  app.set("views", path.join(__dirname, '..', "views"));
  app.set("view engine", "hbs");
}
