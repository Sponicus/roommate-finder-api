const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config('./env');
  
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');
// const findRoommatesRouter = require('./routes/find_roommates');
const matchesRouter =  require('./routes/matches');
const resgisterRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userProfileRouter = require('./routes/userProfile');
const userPreferencesRouter = require('./routes/userPreferences');

const app = express();

// const db = require('./src/db');
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(db));
app.use('/api/profiles', profilesRouter);
// app.use('/api/find_roommates', findRoommatesRouter);
app.use('/api/matches', matchesRouter(db));
app.use('/api/signup', resgisterRouter(db));
app.use('/api/login', loginRouter(db));
app.use('/api/logout', logoutRouter(db));
app.use('/api/userProfile', userProfileRouter(db));
app.use('/api/userPreferences', userPreferencesRouter(db));

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
