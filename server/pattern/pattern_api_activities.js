
var Apiactivities = require('../models/api_activities');
var apiactivitiesPattern = {};

//get by _id
apiactivitiesPattern.getById = function(id_activities, next) {
    Apiactivities.findOne({_id : id_activities})
    .populate({ path: 'id_api', select: '_id title_api' })
    .populate({ path: 'bookmark_api', select: '_id full_name' })
    .populate({ path: 'like_api', select: '_id full_name' })
    .populate({ path: 'dislike_api', select: '_id full_name' })
    .populate({ path: 'comment_api', select: '_id full_name' })
    .populate({ path: 'share_api', select: '_id full_name' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Activities has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by id_api
apiactivitiesPattern.getByIdApi = function(id_api, next) {
    Apiactivities.findOne({id_api : id_api})
    .populate({ path: 'id_api', select: '_id title_api' })
    .populate({ path: 'bookmark_api', select: '_id full_name' })
    .populate({ path: 'like_api', select: '_id full_name' })
    .populate({ path: 'dislike_api', select: '_id full_name' })
    .populate({ path: 'comment_api', select: '_id full_name' })
    .populate({ path: 'share_api', select: '_id full_name' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Activities has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get all api
apiactivitiesPattern.getAllApi = function(next) {
    Apiactivities.find({})
    .populate({ path: 'id_api', select: '_id title_api' })
    .populate({ path: 'bookmark_api', select: '_id full_name' })
    .populate({ path: 'like_api', select: '_id full_name' })
    .populate({ path: 'dislike_api', select: '_id full_name' })
    .populate({ path: 'comment_api', select: '_id full_name' })
    .populate({ path: 'share_api', select: '_id full_name' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Activities has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//delete by _id
apiactivitiesPattern.deleteById = function(id_activities, next) {
	Apiactivities.findOneAndRemove({_id: id_activities}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
//delete by id_api
apiactivitiesPattern.deleteByIdApi = function(id_api, next) {
	Apiactivities.findOneAndRemove({id_api: id_api}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};

//delete one bookmarker by _id
// apiactivitiesPattern.deleteOneBookmarkerById = function(id, id_bookmarker) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.bookmark_api._id(id_bookmarker).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };
//delete one bookmarker by id_api
apiactivitiesPattern.deleteOneBookmarkerByIdApi = function(dataDelete, next) {
	Apiactivities.findOne({id_api: dataDelete.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.bookmark_api._id(dataDelete.id_bookmarker).removed();
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//delete one like_api by _id
// apiactivitiesPattern.deleteOneLikerById = function(id, id_liker) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.like_api._id(id_liker).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };
//delete one like_api by id_api
apiactivitiesPattern.deleteOneLikerByIdApi = function(dataDelete, next) {
	Apiactivities.findOne({id_api: dataDelete.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.like_api._id(dataDelete.id_liker).removed();
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};
//delete one dislike_api by _id
// apiactivitiesPattern.deleteOneDislikerById = function(id, id_disliker) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.dislike_api._id(id_disliker).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };
//delete one dislike_api by id_api
apiactivitiesPattern.deleteOneDislikerByIdApi = function(dataDelete, next) {
	Apiactivities.findOne({id_api: dataDelete.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.dislike_api._id(dataDelete.id_disliker).removed();
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};
//delete one comment_api by _id
// apiactivitiesPattern.deleteOneCommentatorById = function(id, id_comentator) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.comment_api._id(id_comentator).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };
//delete one comment_api by id_api
// apiactivitiesPattern.deleteOneCommentatorByIdApi = function(id_api, id_comentator) {
// 	Apiactivities.findOne({id_api: id_api}, function(err, list){
// 		list.comment_api._id(id_comentator).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };
//delete one share_api
// apiactivitiesPattern.deleteOneSharerById = function(id, id_sharer) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.share_api._id(id_sharer).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };
//delete one share_api by id_api
// apiactivitiesPattern.deleteOneSharerByIdApi = function(id_api, id_sharer) {
// 	Apiactivities.findOne({id_api: id_api}, function(err, list){
// 		list.share_api._id(id_sharer).removed();
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were removed');
// 		});
// 	});
// };

//create api_activities together with api

//update bookmark_api by _id
// apiactivitiesPattern.updateBookmarkerById = function(id, id_bookmarker) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.bookmark_api.push(id_bookmarker);
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were saved');
// 		});
// 	});
// };
//update bookmark_api by id_api
apiactivitiesPattern.updateBookmarkerByIdApi = function(dataUpdate, next) {
	Apiactivities.findOne({id_api: dataUpdate.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.bookmark_api.push(dataUpdate.id_bookmarker);
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update like_api by _id
// apiactivitiesPattern.updateLikerById = function(id, id_liker) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.like_api.push(id_liker);
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were saved');
// 		});
// 	});
// };
//update like_api by id_api
apiactivitiesPattern.updateLikerByIdApi = function(dataUpdate, next) {
	Apiactivities.findOne({id_api: dataUpdate.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.like_api.push(dataUpdate.id_liker);
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update dislike_api by _id
// apiactivitiesPattern.updateDislikerById = function(id, id_disliker) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.dislike_api.push(id_disliker);
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were saved');
// 		});
// 	});
// };
//update dislike_api by id_api
apiactivitiesPattern.updateDislikerByIdApi = function(dataUpdate, next) {
	Apiactivities.findOne({id_api: dataUpdate.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.dislike_api.push(dataUpdate.id_disliker);
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update comment_api by _id
// apiactivitiesPattern.updateCommentatorById = function(id, id_comentator) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.comment_api.push(id_comentator);
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were saved');
// 		});
// 	});
// };
//update comment_api by id_api
apiactivitiesPattern.updateCommentatorByIdApi = function(dataUpdate, next) {
	Apiactivities.findOne({id_api: dataUpdate.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.comment_api.push(dataUpdate.id_comentator);
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update share_api by _id
// apiactivitiesPattern.updateSharerById = function(id, id_sharer) {
// 	Apiactivities.findOne({_id: id}, function(err, list){
// 		list.share_api.push(id_sharer);
// 		Apiactivities.save(function (err) {
// 		  	if (err) return handleError(err);
// 		  	console.log('the subdocs were saved');
// 		});
// 	});
// };
//update share_api by id_api
apiactivitiesPattern.updateSharerByIdApi = function(dataUpdate, next) {
	Apiactivities.findOne({id_api: dataUpdate.id_api}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));

		list.share_api.push(dataUpdate.id_sharer);
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

module.exports = apiactivitiesPattern;

// one api have one activities