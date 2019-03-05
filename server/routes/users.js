var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var userService = require('../service/service_usr');
var publishService = require('../service/service_usr_publish');

router.get('/',csrfProtection, function(req, res, next){
	if(req.session.username){
		var username = req.session.username;
		res.redirect('/'+username);
	}else{
		res.redirect('/users/sign-in');
	}
});

/** SIGN_IN:
 * 		require userService.LoginUser(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to sign-in page (future)
 *		_POST 	get the username and password
 *				will generate the session
 *				will compare the password with the hash
 *				redirect to Home page (future)
 *				use passport middleware (future)
 */
router.get('/sign-in', csrfProtection, function(req, res, next) {
	if(!req.session.username){
		res.send({ message : 'You Are in sign-in Page', csrfToken : req.csrfToken(), session : req.session });
	}else{
		res.status(405).send({ message : 'You Are already sign-in.. log out first'});
	}
});
router.post('/sign-in', function(req, res, next) {
	if (!req.session.username) {
		var data = {
			username: req.body.username,
			password: req.body.password
		};
	  	userService.loginUser(data, function(err, isMatch){
	  		if(err){
				return res.send({ message : err.message });
			}
			if (isMatch == true) {
				thirtyDays = 30*24*60*60*1000;
				req.session.username = data.username;
				req.session.cookie.expires = new Date(Date.now() + thirtyDays);
				req.session.cookie.maxAge = thirtyDays;
				console.log(req.session.username);
				return res.send({ message : 'Hey welcome you verified', session : req.session });
			}else{
				return res.send({ message : err.message });
			}
	  	});
	}else{
		res.status(405).send({ message : 'Hey Man Dont hacking on this'});
	}
});

/** SIGN_UP:
 * 		require userService.registerUser(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to sign-up page (future)
 *		_POST 	get the username, password, email, role, status
 *				will saving the data to Schema usr_account
 *				redirect to sign-in page (future)
 */
router.get('/sign-up', csrfProtection, function(req, res, next) {
	if(!req.session.username){
		res.send({ message : 'You Are in sign-up Page', csrfToken : req.csrfToken() });
	}else{
		res.status(405).send({ message : 'You Are already sign-in.. log out first'});
	}	
});
router.post('/sign-up', function(req, res, next) {
	if (!req.session.username) {
		var data = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			role: req.body.role,
			status: req.body.status
		};
		userService.registerUser(data, function(err){
	  		if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({ message : 'Account has been Created1' });
			}
	  	});
	}else{
		res.status(405).send({ message : 'Hey Man Dont hacking on this'});
	}	
});

/** SIGN_OUT:
 * 		require req.session.username for control the flow
 *		_GET 	will destroy the session
 *				redirect to sign-in page (future)
 */
router.get('/sign-out', function(req, res, next){
	if (req.session.username) {
		req.session.destroy();
		return res.status(200).send({message : 'you have been logout... see ya!!'});
	}else{
		res.status(405).send({ message : 'Hey Man your not Log-in'});
	}	
});

/** :USERNAME:
 * 		require userService.getHomePage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				get the profile : username, email, full_name, profile picture
 *				redirect to Home page (future)
 */
router.get('/dashboard/:username', csrfProtection, function(req, res, next) {
	var username = req.params.username;
	if(req.session.username == username){		
		userService.getHomePage(username, function(err, profile){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send(profile);
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/PROFILE:
 * 		require userService.getProfilePage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				get the profile, contact, address, bookmark, following, follower
 *				redirect to Profile page (future)
 */
router.get('/profile/:username', csrfProtection, function(req, res, next) {
	var username = req.params.username;
	if(req.session.username == username){
		userService.getProfilePage(username, function(err, profile, contact, address, bookmark, following, follower){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({
					profile: profile, contact: contact, address: address, 
					bookmark: bookmark, following: following, follower: follower
				});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

router.post('/profile/:username/update/:part', function(req, res, nxt){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username 		: req.params.username,
			part 			: req.params.part,
			full_name 		: req.body.full_name,
			profile_picture	: req.body.profile_picture,
			cover_picture	: req.body.cover_picture,
			about 			: req.body.about
		};
		userService.updateProfileUser(data, function(err){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({ message : "update berhasil"});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/BOOKMARK:
 * 		require userService.getBookmarkPage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and bookmark
 *				redirect to bookmark page (future)
 */
router.get('/bookmark/:username', csrfProtection, function(req, res, next) {
	var username = req.params.username;
	if(req.session.username == username){
		userService.getBookmarkPage(username, function(err, profile, bookmark){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({profile : profile, bookmark: bookmark});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/FOLLOWER:
 * 		require userService.getFollowerPage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and follower
 *				redirect to follower page (future)
 */
router.get('/follower/:username', csrfProtection, function(req, res, next) {
	var username = req.params.username;
	if(req.session.username == username){
		userService.getFollowerPage(username, function(err, profile, follower){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({profile : profile, follower: follower});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/FOLLOWING:
 * 		require userService.getFollowingPage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and following
 *				redirect to following page (future)
 */
router.get('/following/:username', csrfProtection, function(req, res, next) {
	var username = req.params.username;
	if(req.session.username == username){
		userService.getFollowingPage(username, function(err, profile, following){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({profile : profile, following: following});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/SETTING:
 * 		require userService.loginUser(data);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to Setting page (future)
 *		_POST 	get username and password
 *				create req.session.verification for double security
 *				redirect to GeneralSetting page (future)
 */
router.get('/setting/:username', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		res.send({ message : 'You Are in Setting Page', csrfToken : req.csrfToken(), session : req.session });
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

router.post('/setting/:username', function(req, res, next){
	var data = {
		username : req.params.username,
		password : req.body.password
	};
	if(req.session.username == data.username){
		userService.loginUser(data, function(err, isMatch){
	  		if(err){
				return res.send({ message : err.message });
			}
			if (isMatch == true) {
				req.session.verification = data.username;
				return res.send({ message : 'Hey welcome you verified', session : req.session });
			}else{
				return res.send({ message : err.message });
			}
	  	});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/SETTING/ACCOUNT:
 * 		require userService.updateAccountUser(data);	
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and account
 *		_POST 	get username and password
 *				redirect to this.page with <message> (future)
 */
router.get('/setting/:username/account', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
			userService.getSettingAccountPage(username, function(err, profile, account){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					return res.send({profile: profile, account: account});
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

router.post('/setting/:username/account', function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
			var data = {
				username: req.params.username,
				password: req.body.password
			};
			userService.updateAccountUser(data, function(err){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					return res.send({ message : 'account has been updated'});
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/SETTING/CONTACT:
 * 		require userService.updateContactUser(data);	
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and contact
 *		_POST 	get req.body.:contact
 *				redirect to this.page with <message> (future)
 */
router.get('/setting/:username/contact', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
			userService.getSettingContactPage(username, function(err, profile, contact){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					return res.send({profile: profile, contact: contact});
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

router.post('/setting/:username/contact', function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
			var data = {
				username 		: req.params.username,
				phone_number 	: req.body.phone_number,
				github 			: req.body.github,
				facebook 		: req.body.facebook,
				twitter			: req.body.twitter
			};
			userService.updateContactUser(data, function(err){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					return res.send({ message : 'contact has been updated'});
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/SETTING/ADDRESS:
 * 		require userService.updateAddressUser(data);	
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and account
 *		_POST 	get req.body.:address
 *				redirect to this.page with <message> (future)
 */
router.get('/setting/:username/address', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
			userService.getSettingAddressPage(username, function(err, profile, address){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					return res.send({profile: profile, address: address});
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

router.post('/setting/:username/address', function(req, res, next){
 	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
			var data = {
				username 		: req.params.username,
				province 		: req.body.province,
				city 			: req.body.city,
				subdistrict1 	: req.body.subdistrict1,
				subdistrict2	: req.body.subdistrict2,
				street 			: req.body.street,
				postal_code		: req.body.postal_code
			};
			userService.updateAddressUser(data, function(err){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					return res.send({ message : 'address has been updated'});
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/SETTING/DELETE:
 * 		require userService.deleteAccountUser(username);	
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_POST 	will delete the account
 *				redirect to this.page with <message> (future)
 */
router.post('/setting/:username/delete', function(req, res, next){
 	var username = req.params.username;
	if(req.session.username == username){
		if (req.session.verification == username) {
				
			userService.deleteAccountUser(username, function(err){
				if(err){
					return res.send({ message : err.message });
				}
				else{
					req.session.destroy();
					return res.send({ message : 'account has been delete', session : req.session });
				}
			});
		}else{
			res.send({ message : 'You Are not verificated.. sign-in first'});
		} 		
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});




// router.get('/api/:username/list/:status', function(req, res, next){
// 	var username = req.params.username;
// 	if(req.session.username == username){
// 		var data = {
// 			username 	: req.params.username,
// 			path		: req.params.status
// 		};
// 		userService.getApiPage(data, function(err, profile, listApi){
// 			if(err){
// 				return res.send({ message : err.message });
// 			}
// 			else{
// 				return res.send({profile : profile, listApi: listApi});
// 			}
// 		});
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });


// router.get('/video/:username/list/:status', function(req, res, next){
// 	var username = req.params.username;
// 	if(req.session.username == username){
// 		var data = {
// 			username 	: req.params.username,
// 			path		: req.params.status
// 		};
// 		userService.getVideoPage(data, function(err, profile, listVideo){
// 			if(err){
// 				return res.send({ message : err.message });
// 			}
// 			else{
// 				return res.send({profile : profile, listVideo: listVideo});
// 			}
// 		});
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });

module.exports = router;