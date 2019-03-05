var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
  	// res.send({
   //    status: 'Home'
   //  });
   res.render('index');
});


router.get('/sign-up', function(req, res, next) {
	console.log(req.session);
  	res.send({
      status: 'sign-up'
    });
});

router.get('/forgot-password', function(req, res, next) {
	console.log(req.session);
  	res.send({
      status: 'forgot-password'
    });
});
router.get('/lock-screen', function(req, res, next) {
	console.log(req.session);
  	res.send({
      status: 'lock-screen'
    });
});
router.get('/session-timeout', function(req, res, next) {
	console.log(req.session);
  	res.send({
      status: 'session-timeout'
    });
});
module.exports = router;
