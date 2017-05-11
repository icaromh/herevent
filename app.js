const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const FB = require('fb');
const Config = require('./config.js');

const api = require('./routes/index');
const defaultRoute = require('./routes/default');

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

// renew access_token
// app.use((req, res, next) => {
//   const expires = app.get('expires') || 0;
//   const in15minutes = 900;
//   const isExpiring = (Date.now() / 1000 | 0) > expires - (expires % in15minutes);
//
//   if(!app.get('expires') || isExpiring){
//     FB.api('oauth/access_token', {
//       client_id: Config.fb.app_id,
//       client_secret: Config.fb.app_secret,
//       grant_type: 'fb_exchange_token',
//       fb_exchange_token: app.get('accessToken') || res.locals.accessToken,
//     }, fbRes => {
//       console.log(fbRes);
//       if(!fbRes || fbRes.error) {
//         console.log(!fbRes ? 'error occurred' : fbRes.error);
//         next();
//         return;
//       }
//       app.set('expires',fbRes.expires ? fbRes.expires : 0);
//       app.set('accessToken', fbRes.access_token)
//       next();
//     });
//   }
// })

app.use(function(req, res, next) {
  res.locals.accessToken = Config.fb.access_token;
  next()
});


app.options('*', cors());
app.use('/', defaultRoute);
app.use('/api', api);


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
