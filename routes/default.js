var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send({
    'routes': {
      'routes': 'https://herevent.herokuapp.com/',
      'healthcheck': 'https://herevent.herokuapp.com/healthcheck',
      'search': 'https://herevent.herokuapp.com/api/search/:term'
    }
  })
});

router.get('/healthcheck', (req, res, next) => {
  res.send({ 'alive': true });
});


module.exports = router;
