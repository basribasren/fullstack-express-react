
var Articel = require('../models/articel');
var Articel_activites = require('../models/articel_activities');
var articelPattern = {};

/** :getById:
 * 		will findOne by id
 * 		will return all value of articel with :id
 */
articelPattern.getById = function(id_articel, next) {
    Articel.findOne({_id : id_articel})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .populate({ path: 'id_activities'})
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdProfile:
 * 		will findOne by id_profile
 * 		will return articel with :id_profile
 */
articelPattern.getByIdProfile = function(id_profile, next) {
    Articel.find({id_profile : id_profile})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .populate({ path: 'id_activities'})
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
/** :getByIdProfile:
 * 		will findOne by id_profile
 * 		will return articel with :id_profile
 */
articelPattern.getByIdProfileForUser = function(getArticel, next) {
    Articel.find({$and: [
    	{id_profile : getArticel.id_profile}, {status_articel : getArticel.status_articel}
    ]})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .populate({ path: 'id_activities'})
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByTitle:
 * 		will findOne by title
 * 		will return articel with :title
 */
articelPattern.getByTitle = function(title, next) {
    Articel.find({title_articel : title})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .populate({ path: 'id_activities'})
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by tag_articel

/** :getAllArticel:
 * 		will find all articel
 * 		will return all articel
 * 		will return just we need (future)
 */
articelPattern.getAllArticel = function(next) {
    Articel.find({$and: [
        {visibility_articel : "public"}, {status_articel : "publish"}
    ]})
    .populate({ path: 'id_profile', select: '_id full_name profile_picture' })
    .populate({ path: 'id_activities'})
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};

//delete by _id
articelPattern.deleteById = function(id_articel, next) {
	Articel.findOneAndRemove({_id: id_articel}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
//delete All by id_profile
articelPattern.deleteByIdProfile = function(dataDelete, next) {
	Articel.find({ $and: [
        {id_profile : dataDelete.id_profile}, {status_articel : dataDelete.status_articel}
    ]}, function (err, list) {
	  	if (err) { return next(new Error('Error While finding articel...')); }
	  	
	  	list.remove({}, function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
        	next();
		  	// removed!
		});
	});
};

//create Articel
articelPattern.saveArticel = function(dataArticel, next) {
	var newArticel = new Articel({
		id_profile				: dataArticel.id_profile,
		title_articel			: dataArticel.title_articel,
		cover_articel			: dataArticel.cover_articel,
		header_articel			: dataArticel.header_articel,
		body_articel			: dataArticel.body_articel,
		tag_articel				: dataArticel.tag_articel,
		visibility_articel      : dataArticel.visibility_articel,
        status_articel          : dataArticel.status_articel
	});
    Articel.create(newArticel, function (err, result) {
	  	if (err) return next(new Error(err.message));
	  	// saved account!

	  	var newActivities = new Articel_activites({
		    id_articel: result._id,  		// assign the _id from the account
		});
		  
		Articel_activites.create(newActivities, function (err, activities) {
		    if (err) return next(new Error(err.message));
		    // saved articel!
		    Articel.findOneAndUpdate({_id: activities.id_articel}, {
		    	$set: {
		    		id_activities			: activities._id
		    	}
		    }, function (err) {
			  	if (err) return next(new Error('Error While update...'));
				next();
			  	// updated articel!	  	
			});
		});
	next();
	});
};

//update by _id
articelPattern.updateById = function(dataUpdate, next) {
	Articel.findOneAndUpdate({_id: dataUpdate.id_articel}, {
    	$set: {
    		title_articel			: dataUpdate.title_articel,
			cover_articel			: dataUpdate.cover_articel,
			header_articel			: dataUpdate.header_articel,
			body_articel			: dataUpdate.body_articel,
			tag_articel				: dataUpdate.tag_articel,
			visibility_articel      : dataUpdate.visibility_articel,
            status_articel          : dataUpdate.status_articel
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();
	  	// updated articel!	  	
	});
};
articelPattern.updateStatusById = function(dataUpdate, next) {
    Articel.findOneAndUpdate({_id: dataUpdate.id_articel}, {
        $set: {
            status_articel          : dataUpdate.status_articel
        }
    }, function (err) {
        if (err) return next(new Error('Error While update...'));
        next();
        // updated articel!     
    });
};



articelPattern.countBookmark = function(listBookmark, next){
	Articel.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
articelPattern.countLike = function(listLike, next){
	Articel.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
articelPattern.countDislike = function(listDislike, next){
	Articel.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
articelPattern.countShare = function(listShare, next){
	Articel.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
articelPattern.countComment = function(listComment, next){
	Articel.count({}, function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Articel has no exist..'));
    	} else {
    		return next(null, result);
    	} 
	});
};
module.exports = articelPattern;