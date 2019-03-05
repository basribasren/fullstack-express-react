var articel 	= require('../pattern/pattern_articel');
var activities	= require('../pattern/pattern_articel_activities');
var profile 	= require('../pattern/pattern_usr_profile');

var articelPrivate = {};


articelPrivate.getListArticelPage = function(getArticel, next){
	profile.getByUsername(username, function(err, profileResult){
		if (err) return next(new Error(err.message));

		var data = {
			id_profile 		: profileResult._id,
			status_articel	: getArticel.path
		};
		articel.getByIdProfileForUser(data, function(err, articelResult){
			if (err) return next(new Error(err.message));

	    	if (articelResult == null) {
	    		return next(new Error('Articel has no exist..'));
	    	} else {
	    		return next(null, articelResult);
	    	} 
		});
	next();
	});	
};

articelPrivate.getViewArticelPage = function(getArticel, next){
	articel.getById(getArticel.id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};

articelPrivate.getSaveArticelPage = function(dataArticel, next){
	profile.getByUsername(dataArticel.username, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});	
};
articelPrivate.postSaveArticelPage = function(dataSave, next){
	// console.log(dataSave);
	profile.getByUsername(dataSave.username, function(err, profileResult){
		if (err) return next(new Error(err.message));
		var data = dataSave;

		data.id_profile = profileResult._id;

		articel.saveArticel(data, function(err){
			if(err) return next(new Error(err.message));
			next();
		});
	});	
	
};

articelPrivate.getUpdateArticelPage = function(dataArticel, next){
	profile.getByUsername(dataArticel.username, function(err, profileResult){
		if (err) return next(new Error(err.message));
		
		articel.getById(dataArticel.id_articel, function(err, articelResult){
			if (err) return next(new Error(err.message));

			if (result == null) {
	    		return next(new Error('Articel has no exist..'));
	    	} else {
	    		return next(null, profileResult, articelResult);
	    	} 
		});
	});
};
articelPrivate.postUpdateArticelPage = function(dataUpdate, next){
	articel.updateById(dataUpdate, function(err){
		if (err) return next(new Error(err.message));
		next();
	});
};

articelPrivate.postDeleteArticelPage = function(dataMove, next){
	articel.updateStatusById(dataMove, function(err){
		if (err) return next(new Error(err.message));
		next();
	});
};
articelPrivate.postDeleteTrashPage = function(dataDelete, next){
	articel.deleteByIdProfile(dataUpdate.id_articel, function(err){
		if (err) return next(new Error(err.message));

		activities.deleteByIdArticel(dataUpdate.id_articel, function(err){
			if (err) return next(new Error(err.message));
			next();
		});
	});
};
articelPrivate.getListBookmarkPage = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		var list_bookmark = result.id_activities.bookmark_articel;
    		console.log(list_bookmark);
    		
    		articel.countBookmark(list_bookmark, function(err, count){
    			var data = {
	    			id_articel : result._id,
	    			title_articel : result.title_articel,
	    			id_activities : result.id_activities,
	    			list_bookmark : result.id_activities.bookmark_articel,
	    			count_bookmark : count
	    		};
	    		return next(null, data);
    		});    		
    	} 		
	});
};
articelPrivate.getListLikePage = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else if (result.status_articel != "publish" || result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else if (result.status_articel != "publish" && result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else {
    		var list_like = result.id_activities.like_articel;
    		console.log(list_like);
    		
    		articel.countLike(list_like, function(err, count){
    			var data = {
	    			id_articel : result._id,
	    			title_articel : result.title_articel,
	    			id_activities : result.id_activities,
	    			list_like : result.id_activities.like_articel,
	    			count_like : count
	    		};
	    		return next(null, data);
    		});    		
    	} 		
	});
};
articelPrivate.getCountDislikePage = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else if (result.status_articel != "publish" || result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else if (result.status_articel != "publish" && result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else {
    		var list_dislike = result.id_activities.dislike_articel;
    		console.log(list_dislike);
    		
    		articel.countDislike(list_dislike, function(err, count){
    			var data = {
	    			count_dislike : count
	    		};
	    		return next(null, data);
    		});    		
    	} 		
	});
};
articelPrivate.getListCommentPage = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else if (result.status_articel != "publish" || result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else if (result.status_articel != "publish" && result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else {
    		var list_comment = result.id_activities.comment_articel;
    		console.log(list_comment);
    		
    		articel.countComment(list_comment, function(err, count){
    			var data = {
	    			id_articel : result._id,
	    			title_articel : result.title_articel,
	    			id_activities : result.id_activities,
	    			list_comment : result.id_activities.comment_articel,
	    			count_comment : count
	    		};
	    		return next(null, data);
    		});    		
    	} 		
	});
};
articelPrivate.getListSharePage = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else if (result.status_articel != "publish" || result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else if (result.status_articel != "publish" && result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else {
    		var list_share = result.id_activities.share_articel;
    		console.log(list_share);
    		
    		articel.countShare(list_share, function(err, count){
    			var data = {
	    			id_articel : result._id,
	    			title_articel : result.title_articel,
	    			id_activities : result.id_activities,
	    			list_share : result.id_activities.share_articel,
	    			count_bookmark : count
	    		};
	    		return next(null, data);
    		});    		
    	} 		
	});
};

////////////////////////////////////////////////////////////////////////////////////////////
// articelPrivate.postBookmarkArticelPage = function(dataBookmark, next){
// 	profile.getByUsername(dataBookmark.username, function(err, profileResult){
// 		var data = {
// 			id_bookmarker : profileResult._id,
// 			id_articel : dataBookmark.id_articel
// 		};
// 		activities.updateBookmarkerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});		
// }; 
// articelPrivate.popBookmarkArticelPage = function(dataBookmark, next){
// 	profile.getByUsername(dataBookmark.username, function(err, profileResult){
// 		var data = {
// 			id_bookmarker : profileResult._id,
// 			id_articel : dataBookmark.id_articel
// 		};
// 		activities.deleteOneBookmarkerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});		
// }; 
// articelPrivate.postLikeArticelPage = function(dataLike, next){
// 	profile.getByUsername(dataLike.username, function(err, profileResult){
// 		var data = {
// 			id_liker : profileResult._id,
// 			id_articel : dataLike.id_articel
// 		};
// 		activities.updateLikerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});
// };
// articelPrivate.popLikeArticelPage = function(dataLike, next){
// 	profile.getByUsername(dataLike.username, function(err, profileResult){
// 		var data = {
// 			id_liker : profileResult._id,
// 			id_articel : dataLike.id_articel
// 		};
// 		activities.deleteOneLikerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});
// };
// articelPrivate.postDislikeArticelPage = function(dataDislike, next){
// 	profile.getByUsername(dataDislike.username, function(err, profileResult){
// 		var data = {
// 			id_disliker : profileResult._id,
// 			id_articel : dataDislike.id_articel
// 		};
// 		activities.updateDislikerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});
// };
// articelPrivate.popDislikeArticelPage = function(dataDislike, next){
// 	profile.getByUsername(dataDislike.username, function(err, profileResult){
// 		var data = {
// 			id_disliker : profileResult._id,
// 			id_articel : dataDislike.id_articel
// 		};
// 		activities.deleteOneDislikerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});
// };
// articelPrivate.postShareArticelPage = function(dataShare, next){
// 	profile.getByUsername(dataShare.username, function(err, profileResult){
// 		var data = {
// 			id_comentator : profileResult._id,
// 			id_articel : dataShare.id_articel
// 		};
// 		activities.updateSharerByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});
// };

// articelPrivate.postCommentArticelPage = function(dataComment, next){
// 	profile.getByUsername(dataComment.username, function(err, profileResult){
// 		var data = {
// 			id_sharer : profileResult._id,
// 			id_articel : dataComment.id_articel
// 		};
// 		activities.updateCommentatorByIdArticel(data, function(err){
// 			if(err) return next(new Error(err.message));
			
// 			next();
// 		});
// 	});
// };

module.exports = articelPrivate;