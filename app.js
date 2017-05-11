const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const FB = require('fb');
const Config = require('./config.js');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

console.log(Config);

app.use(function(req, res, next) {
  res.locals.accessToken = Config.fb.access_token;
  next()
  // if(!app.get('accessToken')){
  //   FB.api('oauth/access_token', {
  //       client_id: Config.fb.app_id,
  //       client_secret: '8f2a726e0ef84ce44571251dd2900faf',
  //       grant_type: 'client_credentials'
  //   }, function (fbRes) {
  //       if(!fbRes || fbRes.error) {
  //           console.log(!fbRes ? 'error occurred' : fbRes.error);
  //           return;
  //       }
  //       app.set('accessToken', fbRes.access_token);
  //       res.locals.accessToken = app.get('accessToken');
  //       next();
  //   });
  // }else{
  //   res.locals.accessToken = app.get('accessToken');
  //   next();
  // }
});


app.options('*', cors());
app.use('/api', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
