var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const mechanicRouter = require('./routes/mechanicRoute');
const carRouter = require('./routes/carRoute');
const repairRouter = require('./routes/repairRoute');
const createNewUserRoute = require('./routes/createNewUserRoute');

const mechanicApiRouter = require('./routes/api/MechanicApiRoute');
const carApiRouter = require('./routes/api/CarApiRoute');
const repairApiRouter = require('./routes/api/RepairApiRoute');

const authUtil = require('./util/authUtils');


var app = express();

//user session
const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mechanics',authUtil.permitAuthenticatedUser,mechanicRouter);
app.use('/car',authUtil.permitAuthenticatedUser, carRouter);
app.use('/repair',authUtil.permitAuthenticatedUser,repairRouter);
app.use('/createUser',createNewUserRoute);

//api
app.use('/api/mechanics',mechanicApiRouter);
app.use('/api/car', carApiRouter);
app.use('/api/repair', repairApiRouter);

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
  console.log(err.message);

});

module.exports = app;
