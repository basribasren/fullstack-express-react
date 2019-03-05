var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var privateArticelService = require('../service/service_articel_private');

router.get('/', csrfProtection, function(req, res, next){
	if(req.session.username){
		var username = req.session.username;
		res.redirect('/'+username+'/list/publish');
	}else{
		res.redirect('/users/sign-in');
	}
});

/** :USERNAME/ARTICEL:
 * 		require privateArticelService.getArticelPage(username); 
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *		 		*get the list of articel and profile
 *				redirect to articel page (future)
 */
router.get('/:username/list/:status', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username 	: req.params.username,
			path		: req.params.status
		};
		privateArticelService.getListArticelPage(data, function(err, profile, listArticel){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				if (data.path == "publish") {
					return res.send({profile : profile, listArticel: listArticel});
				} else if (data.path == "draft") {
					return res.send({profile : profile, listArticel: listArticel});
				} else if (data.path == "trash") {
					return res.send({profile : profile, listArticel: listArticel});
				} else {
					res.status(404).send({ message : 'Page Not Found'});
				}
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});
router.get('/:username/list/activities/:path', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username 	: req.params.username,
			path		: req.params.path
		};
		privateArticelService.getListArticelPage(data, function(err, profile, listActivities){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				if (data.path == "bookmark") {
					return res.send({profile : profile, listActivities: listActivities});
				} else if (data.path == "like") {
					return res.send({profile : profile, listActivities: listActivities});
				} else if (data.path == "share") {
					return res.send({profile : profile, listActivities: listActivities});
				} else {
					res.status(404).send({ message : 'Page Not Found'});
				}
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

/** :USERNAME/ARTICEL/:ID_ARTICEL:
 * 		require privateArticelService.getViewArticelPage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *		 		*get the value of one articel and profile
 *				redirect to articel page (future)
 */
router.get('/:username/view/:id_articel', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username : req.params.username,
			id_articel : req.params.id_articel
		};	
		privateArticelService.getViewArticelPage(data, function(err, Articel){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({Articel: Articel});
			}
		});
	}else{
		res.send({ message : 'You Are not authenticated.. sign-in first'});
	}
});


/** :USERNAME/ARTICEL/POST:	
 * 		require privateArticelService.getSaveArticelPage(username);	
 * 		require privateArticelService.postSaveArticelPage(username);	
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to aericel page (future)
 *		_POST 	get the title_articel, cover_articel,header_articel
 *			 		body_articel, tag_articel,link_articel
 *				*will saving the articel to Schema articel
 *				redirect to articel page with <message> (future)
 */
router.get('/:username/post', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username : req.params.username
		};		
		privateArticelService.getSaveArticelPage(data, function(err, profile){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({ message : 'this is form post articel', profile: profile});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});
router.post('/:username/post', function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username 			: req.params.username,
			title_articel 		: req.body.title_articel,
			cover_articel		: req.body.cover_articel,
			header_articel		: req.body.header_articel,
			body_articel		: req.body.body_articel,
			tag_articel			: req.body.tag_articel,
			visibility_articel 	: req.body.status_articel,
			status_articel 		: req.body.status_articel
		};		
		// console.log(data);
		privateArticelService.postSaveArticelPage(data, function(err){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({message: 'articel has been save'});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});


/** :USERNAME/ARTICEL/UPDATE/:ID_ARTICEL:
 * 		require privateArticelService.getUpdateArticelPage(username);	
 * 		require privateArticelService.postUpdateArticelPage(username);
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to aericel page (future)
 *		_POST 	get the title_articel, cover_articel,header_articel
 *			 		body_articel, tag_articel,link_articel
 *				*will saving the articel to Schema articel
 *				redirect to articel page with <message> (future)
 */
router.get('/:username/update/:id_articel', csrfProtection, function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){	
		var data = {
			username : req.params.username,
			id_articel : req.params.id_articel
		};
		privateArticelService.getUpdateArticelPage(data, function(err, profile, articel){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({message: 'this is form edit articel', profile: profile, articel: articel});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});
router.post('/:username/update/:id_articel', function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username : req.params.username,
			id_articel : req.params.id_articel,
			title_articel 		: req.body.title_articel,
			cover_articel		: req.body.cover_articel,
			header_articel		: req.body.header_articel,
			body_articel		: req.body.body_articel,
			tag_articel			: req.body.tag_articel,
			visibility_articel 	: req.body.status_articel,
			status_articel 		: req.body.status_articel
		};		
		privateArticelService.postUpdateArticelPage(data, function(err){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({message: 'articel has been update'});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});


/** :USERNAME/ARTICEL/DELETE/:ID_ARTICEL:
 * 		require privateArticelService.postDeleteArticelPage(username);
 * 		require req.session.username for control the flow
 *		_POST 	*will delete the articel to Schema articel
 *				redirect to articel page with <message> (future)
 */
router.delete('/:username/move/:id_articel/to/:path', function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username 		: req.params.username,
			id_articel 		: req.params.id_articel,
			status_articel 	: req.param.path
		};
		privateArticelService.postDeleteArticelPage(data, function(err){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({message: 'articel has been delete'});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});
router.delete('/:username/list/trash/delete', function(req, res, next){
	var username = req.params.username;
	if(req.session.username == username){
		var data = {
			username : req.params.username,
			status_articel : "trash"
		};
		privateArticelService.postDeleteTrashPage(data, function(err){
			if(err){
				return res.send({ message : err.message });
			}
			else{
				return res.send({message: 'articel has been delete'});
			}
		});
	}else{
		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
	}
});

//home page post bookmark articel
// router.post('/:username/bookmark/:id_articel', function(req, res, next){
// 	var username = req.params.username;
// 	var id_articel = req.params.id_articel;
// 	var status = req.body.status_bookmark;
// 	if(req.session.username == username){
// 		var data = {
// 			username : req.params.username,
// 			id_articel : req.params.id_articel
// 		};	
// 		if (status == "true") {
// 			privateArticelService.popBookmarkArticelPage(data, function(err){
// 				if(err){
// 					return res.send({ message : err.message });
// 				}
// 				else{
// 					return res.send({message: 'articel has been bookmark'});
// 				}
// 			});
// 		}else if (status == "false") {
// 			privateArticelService.postBookmarkArticelPage(data, function(err){
// 				if(err){
// 					return res.send({ message : err.message });
// 				}
// 				else{
// 					return res.send({message: 'articel has been bookmark'});
// 				}
// 			});
// 		}else {
// 			return res.send({message: 'dont change the code'});
// 		}		
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });

// //home page post like articel
// router.post('/:username/like/:id_articel', function(req, res, next){
// 	var username = req.params.username;
// 	var id_articel = req.params.id_articel;
// 	var status = req.body.status_like;
// 	if(req.session.username == username){
// 		var data = {
// 			username : req.params.username,
// 			id_articel : req.params.id_articel
// 		};
// 		if (status == "true") {
// 			privateArticelService.popLikeArticelPage(data, function(err){
// 				if(err){
// 					return res.send({ message : err.message });
// 				}
// 				else{
// 					return res.send({message: 'articel has been like'});
// 				}
// 			});
// 		}else if (status == "false") {
// 			privateArticelService.postLikeArticelPage(data, function(err){
// 				if(err){
// 					return res.send({ message : err.message });
// 				}
// 				else{
// 					return res.send({message: 'articel has been like'});
// 				}
// 			});
// 		}else {
// 			return res.send({message: 'dont change the code'});
// 		}	
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });

// router.post('/:username/dislike/:id_articel', function(req, res, next){
// 	var username = req.params.username;
// 	var id_articel = req.params.id_articel;
// 	var status = req.body.status_dislike;
// 	if(req.session.username == username){
// 		var data = {
// 			username : req.params.username,
// 			id_articel : req.params.id_articel
// 		};	
// 		if (status == "true") {
// 			privateArticelService.popDislikeArticelPage(data, function(err){
// 				if(err){
// 					return res.send({ message : err.message });
// 				}
// 				else{
// 					return res.send({message: 'articel has been dislike'});
// 				}
// 			});
// 		}else if (status == "false") {
// 			privateArticelService.postDislikeArticelPage(data, function(err){
// 				if(err){
// 					return res.send({ message : err.message });
// 				}
// 				else{
// 					return res.send({message: 'articel has been dislike'});
// 				}
// 			});
// 		}else {
// 			return res.send({message: 'dont change the code'});
// 		}	
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });

// //home page post share articel
// router.post('/:username/share/:id_articel', function(req, res, next){
// 	var username = req.params.username;
// 	var id_articel = req.params.id_articel;
// 	if(req.session.username == username){
// 		var data = {
// 			username : req.params.username,
// 			id_articel : req.params.id_articel
// 		};	
// 		privateArticelService.postShareArticelPage(data, function(err){
// 			if(err){
// 				return res.send({ message : err.message });
// 			}
// 			else{
// 				return res.send({message: 'articel has been share'});
// 			}
// 		});
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });

// //home page post comment articel
// router.post('/:username/comment/:id_articel', function(req, res, next){
// 	var username = req.params.username;
// 	var id_articel = req.params.id_articel;
// 	if(req.session.username == username){
// 		var data = {
// 			username : req.params.username,
// 			id_articel : req.params.id_articel
// 		};	
// 		privateArticelService.postCommentArticelPage(data, function(err){
// 			if(err){
// 				return res.send({ message : err.message });
// 			}
// 			else{
// 				return res.send({message: 'articel has been comment'});
// 			}
// 		});
// 	}else{
// 		res.status(401).send({ message : 'You Are not authenticated.. sign-in first'});
// 	}
// });

module.exports = router;