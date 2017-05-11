var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('./public/index.html')
});

router.get('/healthcheck', (req, res, next) => {
  res.send({ 'alive': true });
});


module.exports = router;
