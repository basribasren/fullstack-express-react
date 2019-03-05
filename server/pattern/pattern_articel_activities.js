
var Articelactivities = require('../models/articel_activities');
var articelactivitiesPattern = {};

//get by _id
articelactivitiesPattern.getById = function(id_activities, next) {
    Articelactivities.findOne({_id : id_activities})
    .populate({ path: 'id_articel', select: '_id title_articel' })
    .populate({ path: 'bookmark_articel', select: '_id full_name' })
    .populate({ path: 'like_articel', select: '_id full_name' })
    .populate({ path: 'dislike_articel', select: '_id full_name' })
    .populate({ path: 'comment_articel', select: '_id full_name' })
    .populate({ path: 'share_articel', select: '_id full_name' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Activities has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by id_articel
articelactivitiesPattern.getByIdArticel = function(id_articel, next) {
    Articelactivities.findOne({id_articel : id_articel})
    .populate({ path: 'id_articel', select: '_id title_articel' })
    .populate({ path: 'bookmark_articel', select: '_id full_name' })
    .populate({ path: 'like_articel', select: '_id full_name' })
    .populate({ path: 'dislike_articel', select: '_id full_name' })
    .populate({ path: 'comment_articel', select: '_id full_name' })
    .populate({ path: 'share_articel', select: '_id full_name' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Activities has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get all articel
articelactivitiesPattern.getAllArticel = function(next) {
    Articelactivities.find({})
    .populate({ path: 'id_articel', select: '_id title_articel' })
    .populate({ path: 'bookmark_articel', select: '_id full_name' })
    .populate({ path: 'like_articel', select: '_id full_name' })
    .populate({ path: 'dislike_articel', select: '_id full_name' })
    .populate({ path: 'comment_articel', select: '_id full_name' })
    .populate({ path: 'share_articel', select: '_id full_name' })
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
articelactivitiesPattern.deleteById = function(id_activities, next) {
	Articelactivities.findOneAndRemove({_id: id_activities}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
//delete by id_articel
articelactivitiesPattern.deleteByIdArticel = function(id_articel, next) {
	Articelactivities.findOneAndRemove({id_articel: id_articel}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};

//delete one bookmarker by _id
// articelactivitiesPattern.deleteOneBookmarkerById = function(dataDelete, next) {
// 	Articelactivities.findOne({_id: dataDelete.id}, function(err, list){
// 		list.bookmark_articel._id(dataDelete.id_bookmarker).removed();

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };
//delete one bookmarker by id_articel
articelactivitiesPattern.deleteOneBookmarkerByIdArticel = function(dataDelete, next) {
	Articelactivities.findOne({id_articel: dataDelete.id_articel}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));
		list.bookmark_articel._id(dataDelete.id_bookmarker).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
        	next();
		});
	});
};

//delete one like_articel by _id
// articelactivitiesPattern.deleteOneLikerById = function(dataDelete, next) {
// 	Articelactivities.findOne({_id: dataDelete.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.like_articel._id(dataDelete.id_liker).removed();

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };
//delete one like_articel by id_articel
articelactivitiesPattern.deleteOneLikerByIdArticel = function(dataDelete, next) {
	Articelactivities.findOne({id_articel: dataDelete.id_articel}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));
		list.like_articel._id(dataDelete.id_liker).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
        	next();
		});
	});
};
//delete one dislike_articel by _id
// articelactivitiesPattern.deleteOneDislikerById = function(dataDelete, next) {
// 	Articelactivities.findOne({_id: dataDelete.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.dislike_articel._id(dataDelete.id_disliker).removed();

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };
//delete one dislike_articel by id_articel
articelactivitiesPattern.deleteOneDislikerByIdArticel = function(dataDelete, next) {
	Articelactivities.findOne({id_articel: dataDelete.id_articel}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));
		list.dislike_articel._id(dataDelete.id_disliker).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
        	next();
		});
	});
};

//delete one share_articel
// articelactivitiesPattern.deleteOneSharerById = function(dataDelete, next) {
// 	Articelactivities.findOne({_id: dataDelete.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.share_articel._id(dataDelete.id_sharer).removed();

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };
//delete one share_articel by id_articel
// articelactivitiesPattern.deleteOneSharerByIdArticel = function(dataDelete, next) {
// 	Articelactivities.findOne({id_articel: dataDelete.id_articel}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.share_articel._id(dataDelete.id_sharer).removed();

// 		list.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };

//delete one comment_articel by _id
// articelactivitiesPattern.deleteOneCommentatorById = function(dataDelete, next) {
// 	Articelactivities.findOne({_id: dataDelete.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.comment_articel._id(dataDelete.id_comentator).removed();

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };
//delete one comment_articel by id_articel
// articelactivitiesPattern.deleteOneCommentatorByIdArticel = function(dataDelete, next) {
// 	Articelactivities.findOne({id_articel: dataDelete.id_articel}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.comment_articel._id(dataDelete.id_comentator).removed();

// 		list.save(function (err) {
// 		  	if (err) return next(new Error('Error While deleting...'));
//         	next();
// 		});
// 	});
// };

//create articel_activities together with articel

//update bookmark_articel by _id
// articelactivitiesPattern.updateBookmarkerById = function(dataUpdate, next) {
// 	Articelactivities.findOne({_id: dataUpdate.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.bookmark_articel.push(dataUpdate.id_bookmarker);

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While update...'));
// 			next();
// 		});
// 	});
// };
//update bookmark_articel by id_articel
articelactivitiesPattern.updateBookmarkerByIdArticel = function(dataUpdate, next) {
	Articelactivities.findOne({id_articel: dataUpdate.id_articel}).exec(function(err, list){
		
		if (err) return next(new Error('Error While finding activities...'));
		list.bookmark_articel.push(dataUpdate.id_bookmarker);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};


//update like_articel by _id
// articelactivitiesPattern.updateLikerById = function(dataUpdate, next) {
// 	Articelactivities.findOne({_id: dataUpdate.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.like_articel.push(dataUpdate.id_liker);

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While update...'));
// 			next();
// 		});
// 	});
// };
//update like_articel by id_articel
articelactivitiesPattern.updateLikerByIdArticel = function(dataUpdate, next) {
	Articelactivities.findOne({id_articel: dataUpdate.id_articel}, function(err, list){

		if (err) return next(new Error('Error While finding activities...'));
		list.like_articel.push(dataUpdate.id_liker);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update dislike_articel by _id
// articelactivitiesPattern.updateDislikerById = function(dataUpdate, next) {
// 	Articelactivities.findOne({_id: dataUpdate.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.dislike_articel.push(dataUpdate.id_disliker);

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While update...'));
// 			next();
// 		});
// 	});
// };
//update dislike_articel by id_articel
articelactivitiesPattern.updateDislikerByIdArticel = function(dataUpdate, next) {
	Articelactivities.findOne({id_articel: dataUpdate.id_articel}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));
		list.dislike_articel.push(dataUpdate.id_disliker);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update comment_articel by _id
// articelactivitiesPattern.updateCommentatorById = function(dataUpdate, next) {
// 	Articelactivities.findOne({_id: dataUpdate.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.comment_articel.push(dataUpdate.id_comentator);

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While update...'));
// 			next();
// 		});
// 	});
// };
//update comment_articel by id_articel
articelactivitiesPattern.updateCommentatorByIdArticel = function(dataUpdate, next) {
	Articelactivities.findOne({id_articel: dataUpdate.id_articel}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));
		list.comment_articel.push(dataUpdate.id_comentator);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

//update share_articel by _id
// articelactivitiesPattern.updateSharerById = function(dataUpdate, next) {
// 	Articelactivities.findOne({_id: dataUpdate.id}, function(err, list){
// 		if (err) return next(new Error('Error While finding activities...'));
// 		list.share_articel.push(dataUpdate.id_sharer);

// 		Articelactivities.save(function (err) {
// 		  	if (err) return next(new Error('Error While update...'));
// 			next();
// 		});
// 	});
// };
//update share_articel by id_articel
articelactivitiesPattern.updateSharerByIdArticel = function(dataUpdate, next) {
	Articelactivities.findOne({id_articel: dataUpdate.id_articel}, function(err, list){
		if (err) return next(new Error('Error While finding activities...'));
		list.share_articel.push(dataUpdate.id_sharer);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

module.exports = articelactivitiesPattern;

// one articel have one activities