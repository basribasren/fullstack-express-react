
var Videoactivities = require('../models/video_activities');
var videoactivitiesPattern = {};

//get by _id
videoactivitiesPattern.getById = function(id_activities) {
    Videoactivities.findOne({_id : id_activities})
    .populate({ path: 'id_video', select: '_id' })
    .populate({ path: 'bookmark_video', select: '_id' })
    .populate({ path: 'like_video', select: '_id' })
    .populate({ path: 'dislike_video', select: '_id' })
    .populate({ path: 'comment_video', select: '_id' })
    .populate({ path: 'share_video', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//get by id_video
videoactivitiesPattern.getByIdVideo = function(id_video) {
    Videoactivities.findOne({id_video : id_video})
    .populate({ path: 'id_video', select: '_id' })
    .populate({ path: 'bookmark_video', select: '_id' })
    .populate({ path: 'like_video', select: '_id' })
    .populate({ path: 'dislike_video', select: '_id' })
    .populate({ path: 'comment_video', select: '_id' })
    .populate({ path: 'share_video', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//get all video
videoactivitiesPattern.getAllVideo = function() {
    Videoactivities.find({})
    .populate({ path: 'id_video', select: '_id' })
    .populate({ path: 'bookmark_video', select: '_id' })
    .populate({ path: 'like_video', select: '_id' })
    .populate({ path: 'dislike_video', select: '_id' })
    .populate({ path: 'comment_video', select: '_id' })
    .populate({ path: 'share_video', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//delete by _id
videoactivitiesPattern.deleteById = function(id_activities) {
	Videoactivities.findOneAndRemove({_id: id_activities}, options, function (err) {
		if (err) return console.log(err);
		// removed!
	});
};
//delete by id_video
videoactivitiesPattern.deleteByIdVideo = function(id_video) {
	Videoactivities.findOneAndRemove({id_video: id_video}, options, function (err) {
		if (err) return console.log(err);
		// removed!
	});
};

//delete one bookmark by _id
videoactivitiesPattern.deleteOneBookmarkById = function(id, id_bookmarker) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.bookmark_video._id(id_bookmarker).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one bookmark by id_video
videoactivitiesPattern.deleteOneBookmarkByIdVideo = function(id_video, id_bookmarker) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.bookmark_video._id(id_bookmarker).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};

//delete one like_video by _id
videoactivitiesPattern.deleteOneLikeById = function(id, id_liker) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.like_video._id(id_liker).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one like_video by id_video
videoactivitiesPattern.deleteOneLikeByIdVideo = function(id_video, id_liker) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.like_video._id(id_liker).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one dislike_video by _id
videoactivitiesPattern.deleteOneDislikeById = function(id, id_disliker) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.dislike_video._id(id_disliker).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one dislike_video by id_video
videoactivitiesPattern.deleteOneDislikeByIdVideo = function(id_video, id_disliker) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.dislike_video._id(id_disliker).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one comment_video by _id
videoactivitiesPattern.deleteOneCommentById = function(id, id_comentator) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.comment_video._id(id_comentator).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one comment_video by id_video
videoactivitiesPattern.deleteOneCommentByIdVideo = function(id_video, id_comentator) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.comment_video._id(id_comentator).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one share_video
videoactivitiesPattern.deleteOneShareById = function(id, id_sharer) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.share_video._id(id_sharer).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};
//delete one share_video by id_video
videoactivitiesPattern.deleteOneShareByIdVideo = function(id_video, id_sharer) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.share_video._id(id_sharer).removed();
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were removed');
		});
	});
};

//create video_activities together with video

//update bookmark_video by _id
videoactivitiesPattern.updateBookmarkById = function(id, id_bookmarker) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.bookmark_video.push(id_bookmarker);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update bookmark_video by id_video
videoactivitiesPattern.updateBookmarkByIdVideo = function(id_video, id_bookmarker) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.bookmark_video.push(id_bookmarker);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update like_video by _id
videoactivitiesPattern.updateLikeById = function(id, id_liker) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.like_video.push(id_liker);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update like_video by id_video
videoactivitiesPattern.updateLikeByIdVideo = function(id_video, id_liker) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.like_video.push(id_liker);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update dislike_video by _id
videoactivitiesPattern.updateDislikeById = function(id, id_disliker) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.dislike_video.push(id_disliker);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update dislike_video by id_video
videoactivitiesPattern.updateDislikeByIdVideo = function(id_video, id_disliker) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.dislike_video.push(id_disliker);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};

//update comment_video by _id
videoactivitiesPattern.updateCommentById = function(id, id_comentator) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.comment_video.push(id_comentator);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update comment_video by id_video
videoactivitiesPattern.updateCommentByIdVideo = function(id_video, id_comentator) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.comment_video.push(id_comentator);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};

//update share_video by _id
videoactivitiesPattern.updateShareById = function(id, id_sharer) {
	Videoactivities.findOne({_id: id}, function(err, list){
		list.share_video.push(id_sharer);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};
//update share_video by id_video
videoactivitiesPattern.updateShareByIdVideo = function(id_video, id_sharer) {
	Videoactivities.findOne({id_video: id_video}, function(err, list){
		list.share_video.push(id_sharer);
		Videoactivities.save(function (err) {
		  	if (err) return handleError(err);
		  	console.log('the subdocs were saved');
		});
	});
};

module.exports = videoactivitiesPattern;

// one video have one activities