var routers = require("express").Router();
const userRouters = require("./user.route");

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// console.log("in routes")
routers.use('/users', userRouters)

module.exports = routers;

// const router = require('express').Router();
// const apiRoutes = require('./api-routes');
// const htmlRoutes = require('./html-routes');

// router.use('/api', apiRoutes);

// router.use('/', htmlRoutes);

// module.exports = router;