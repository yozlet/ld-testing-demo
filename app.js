const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('ld-testing-demo:server');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Add LaunchDarkly client
const ldSDK = require('launchdarkly-node-server-sdk');
const SDK_KEY = process.env.LD_SDK_KEY;
const ldClient = ldSDK.init(SDK_KEY);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// LaunchDarkly SDK middleware:
// Adds the ldClient and an empty context object to the request object
app.use(function(req, res, next) {
  req.ldClient = ldClient;
  req.ldContext = {
    key: 'anon',
    custom: {}
  };
  next();
});

// Test mode context setter:
// When the set-flag-context-with-cookies flag is enabled, read cookies from
// the request object and add them to the ldContext object
app.use(async function(req, res, next) {
  let testModeEnabled = await req.ldClient.variation('set-flag-context-with-cookies', req.ldContext, false);
  if (testModeEnabled) {
    console.log('Test mode enabled');
    console.log('Cookies: ', req.cookies);
    // iterate through each cookie. If its name begins with 'TESTFLAG_',
    // add the cookie name and value to the ldContext object
    const namePrefix = 'TESTFLAG_';
    Object.keys(req.cookies).forEach(function(cookieName) {
      if (cookieName.startsWith(namePrefix)) {
        console.log('Found ' + cookieName + ' with value ' + req.cookies[cookieName]);
        req.ldContext.custom[cookieName] = req.cookies[cookieName];
        delete req.cookies[cookieName];
      }
    })
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
