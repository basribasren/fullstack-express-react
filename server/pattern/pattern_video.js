
var Video = require('../models/video');
var Video_activities = require('../models/video_activities');
var videoPattern = {};

//get by _id
videoPattern.getById = function(id_video) {
    Video.findOne({_id : id_video})
    .populate({ path: 'id_profile', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//get one by id_profile
videoPattern.getByIdProfile = function(id_profile) {
    Video.findOne({id_profile : id_profile})
    .populate({ path: 'id_profile', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//get by title_video title : /title/
videoPattern.getByTitle = function(title) {
    Video.find({title_video : title})
    .populate({ path: 'id_profile', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//get by tag_video
videoPattern.getByTag = function(tag) {
    Video.find({tag_video : tag})
    .populate({ path: 'id_profile', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//get all Video
videoPattern.getAllVideo = function() {
    Video.find({})
    .populate({ path: 'id_profile', select: '_id' })
    .exec(function(err, result){
		return console.log(result);
	});
};
//delete by _id
videoPattern.deleteById = function(id_video) {
	Video.findOneAndRemove({_id: id_video}, options, function (err) {
		if (err) return console.log(err);
		// removed!
	});
};
//delete All by id_profile
videoPattern.deleteByIdProfile = function(id_profile) {
	Video.find({ id_profile: id_profile }, function (err, list) {
	  	if (err) return console.log(err);
	  	list.remove({}, function (err) {
		  	if (err) return console.log(err);
		  	// removed!
		});
	});
};

//create Video
videoPattern.saveVideo = function(video) {
	var newVideo = new Video({
		title_video	: video.title_video,
		cover_video	: video.cover_video,
		body_video	: video.body_video,
		tag_video	: video.tag_video,
		link_video	: video.link_video
	});
    Video.create(newVideo, function (err, result) {
	  	if (err) return console.log(err);
	  	// saved account!

	  	var newActivities = new Video_activities({
		    id_video: result._id,  		// assign the _id from the account
		});
		  
		Video_activities.create(newActivities, function (err, data) {
		    if (err) return console.log(err);
		    // saved video!
		});
	});
};

//update By Id
videoPattern.updateById = function(video) {
	Video.findOneAndUpdate({_id: video._id}, {
    	$set: {
    		title_video	: video.title_video,
			cover_video	: video.cover_video,
			body_video	: video.body_video,
			tag_video	: video.tag_video,
			link_video	: video.link_video
    	}
    }, option, function (err) {
	  	if (err) return console.log(err);
	  	// update video!	  	
	});
};
//update By Id_profile undefined because we cannot update video where there are same id_profile

module.exports = videoPattern;