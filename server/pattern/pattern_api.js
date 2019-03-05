
var Api = require('../models/api');
var Api_activities = require('../models/api_activities');
var apiPattern = {};

//get by _id
apiPattern.getById = function(id_api, next) {
    Api.findOne({_id : id_api})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('API has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by id_profile
apiPattern.getByIdProfile = function(id_profile, next) {
    Api.findOne({id_profile : id_profile})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('API has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by title_api title : /title/
apiPattern.getByTitle = function(title_api, next) {
    Api.find({title_api : title_api})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('API has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by provider_api provider: /provider/
apiPattern.getByProvider = function(provider_api, next) {
    Api.find({provider_api : provider_api})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('API has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by tag_api

//get all api
apiPattern.getAllApi = function(next) {
    Api.find({})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('API has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};

//delete by _id
apiPattern.deleteById = function(id_api, next) {
	Api.findOneAndRemove({_id: id_api}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
//delete All by id_profile
apiPattern.deleteByIdProfile = function(id_profile, next) {
	Api.findOneAndRemove({id_profile: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};

//create api
apiPattern.saveApi = function(dataSave, next) {
	var newApi = new Api({
		title_api			: dataSave.title_api,
		cover_api			: dataSave.cover_api,
		description_api		: dataSave.description_api,
		documentation_api	: dataSave.documentation_api,
		tos_api				: dataSave.tos_api,
		provider_api		: dataSave.provider_api,
		ssl_support_api		: dataSave.ssl_support_api,
		unofficial_api		: dataSave.unofficial_api,
		hypermedia_api		: dataSave.hypermedia_api,
		tag_api				: dataSave.tag_api,
		link_api			: dataSave.link_api
	});
    Api.create(newApi, function (err, result) {
	  	if (err) return next(new Error(err.message));
	  	// saved account!
	  	var newActivities = new Api_activities({
		    id_api: result._id,  		// assign the _id from the account
		});
		  
		Api_activities.create(newActivities, function (err, data) {
		    if (err) return next(new Error(err.message));

		    Api.findOneAndUpdate({_id: data.id_api}, {
		    	$set: {
		    		id_activities			: data._id
		    	}
		    }, function (err) {
			  	if (err) return next(new Error('Error While update...'));
				// next();
			  	// updated articel!	  	
			});
		    // saved api!
		});
	next();
	});
};

//update by id
apiPattern.updateById = function(dataUpdate) {
	Api.findOneAndUpdate({_id: dataUpdate._id}, {
    	$set: {
    		title_api			: dataUpdate.title_api,
			cover_api			: dataUpdate.cover_api,
			description_api		: dataUpdate.description_api,
			documentation_api	: dataUpdate.documentation_api,
			tos_api				: dataUpdate.tos_api,
			provider_api		: dataUpdate.provider_api,
			ssl_support_api		: dataUpdate.ssl_support_api,
			unofficial_api		: dataUpdate.unofficial_api,
			hypermedia_api		: dataUpdate.hypermedia_api,
			tag_api				: dataUpdate.tag_api,
			link_api			: dataUpdate.link_api
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();
	  	// updated api!	  	
	});
};

apiPattern.countBookmark = function(listBookmark, next){
	Api.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Api has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
apiPattern.countLike = function(listLike, next){
	Api.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Api has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
apiPattern.countDislike = function(listDislike, next){
	Api.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Api has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
apiPattern.countShare = function(listShare, next){
	Api.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Api has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
apiPattern.countComment = function(listComment, next){
	Articel.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Api has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
module.exports = apiPattern;