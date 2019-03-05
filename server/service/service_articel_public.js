var profile 	= require('../pattern/pattern_usr_profile');
var articel 	= require('../pattern/pattern_articel');
var activities	= require('../pattern/pattern_articel_activities');

var articelService = {};

articelService.getListArticelPublic = function(next){
	articel.getAllArticel(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		
    		return next(null, result);
    	} 
	});
};
articelService.getViewArticelPublic = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else if (result.status_articel != "publish" || result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else if (result.status_articel != "publish" && result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else {
    		return next(null, result);
    	} 
	});
};
articelService.getListBookmarkPublic = function(id_articel, next){
	articel.getById(id_articel, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else if (result.status_articel != "publish" || result.visibility_articel != "public"){
            return next(new Error('Articel has no exist..'));
        } else if (result.status_articel != "publish" && result.visibility_articel != "public"){
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
articelService.getListLikePublic = function(id_articel, next){
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
articelService.getCountDislikePublic = function(id_articel, next){
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
articelService.getListCommentPublic = function(id_articel, next){
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
articelService.getListSharePublic = function(id_articel, next){
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

articelService.postSearchArticelPublic = function(title_articel, next){
	
};

module.exports = articelService;