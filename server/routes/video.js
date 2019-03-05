var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var videoService = require('../service/service_video');

/** :USERNAME/VIDEO:
 * 		require userService.registerUser(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to sign-up page (future)
 *		_POST 	get the username, password, email, role, status
 *				will saving the data to Schema usr_account
 *				redirect to sign-in page (future)
 */
router.get('/:username/video', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){		
		userService.getVideoPage(username, function(err, profile){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send(profile);
			}
		});
	}else{
		res.send({ message : 'You Are not authenticated.. sign-in first'});
	}
});
router.get('/:username/video/post', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){		
		userService.getPostVideoPage(username, function(err, profile){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send(profile);
			}
		});
	}else{
		res.send({ message : 'You Are not authenticated.. sign-in first'});
	}
});
router.post('/:username/video/post', function(req, res, next){

});

module.exports = router;