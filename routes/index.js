var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// const router = require('express').Router();
// const apiRoutes = require('./api-routes');
// const htmlRoutes = require('./html-routes');

// router.use('/api', apiRoutes);

// router.use('/', htmlRoutes);

// module.exports = router;