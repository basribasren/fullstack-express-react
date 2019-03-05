var Following = require('../models/usr_following');
var followingPattern = {};

/** :getById:
 * 		will findOne by _id Following
 * 		will return all value of Following with : _id Following
 */
followingPattern.getById = function(id_following, next) {
    Following.findOne({_id : id_following})
    .populate('id_profile','_id username')
    .populate('id_following', '_id full_name profile_picture' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Following has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdProfile:
 * 		will findOne by id_proile
 * 		will return all value of Following with :id_profile
 */
followingPattern.getByIdProfile = function(id_profile, next) {
    Following.findOne({id_profile : id_profile})
    .populate('id_profile','_id username')
    .populate('id_following', '_id full_name profile_picture' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Following has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByUsername:
 * 		will findOne by username
 * 		will return all value of Following with :username
 * 		will "NOT USE" (because in Following theres no username)
 */
followingPattern.getByUsername = function(username, next) {
    Following.findOne({username : username})
    .populate('id_profile','_id username')
    .populate('id_following', '_id full_name profile_picture' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Following has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getAllFollowing:
 * 		will find and return all Following
 * 		will using for admin to get list of Following
 * 		will return just we need (future)
 */
followingPattern.getAllfollowing = function(next) {
    Following.find({})
    .populate('id_profile','_id username')
    .populate('id_following', '_id full_name profile_picture' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Following has no exist.. register first'));
    	} else {    		
    		return next(null, result);
    	} 
	});
};

/** :deleteOneById:
 * 		will delete one following from Following by id
 * 		dataDelete fill with 2 value (_id dan id_following)
 */
followingPattern.deleteOneById = function(dataDelete, next) {
	var following = dataDelete.id_following;

	Following.findOne({_id: dataDelete.id}, function(err, list){
		if (err) return next(new Error('Error While finding following...'));
		list.id_following._id(following).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :deleteOneByIdProfile:
 * 		will delete one following from Following by id_profile
 * 		dataDelete fill with 2 value (id_profile dan id_following)
 */
followingPattern.deleteOneByIdProfile = function(dataDelete, next) {
	var following = dataDelete.id_following;
	
	Following.findOne({id_profile: dataDelete.id_profile}, function(err, list){
		if (err) return next(new Error('Error While finding following...'));
		list.id_following._id(following).removed();
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :deleteOneByUsername:
 * 		will delete one following from Following by username
 * 		dataDelete fill with 2 value (username dan id_following)
 * 		will "NOT USE" (because in Following theres no username)
 */
followingPattern.deleteOneByUsername = function(dataDelete, next) {
	var following = dataDelete.id_following;
	
	Following.findOne({username: dataDelete.username}, function(err, list){
		if (err) return next(new Error('Error While finding following...'));
		list.id_following._id(following).removed();
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :saveFollowing:
 * 		nothing here
 */

/** :updateById:
 * 		will update by id Following
 * 		will push id_following to array id_following
 */
 followingPattern.updateById = function(dataUpdate, next) {
	var following = dataUpdate.id_following;
	
	Following.findOne({_id: dataUpdate.id}, function(err, list){
		if (err) return next(new Error('Error While finding following...'));
		list.id_following.push(id_following);
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};
/** :updateByIdProfile:
 * 		will update by id_pofile
 * 		will push id_following to array id_following
 */
followingPattern.updateByIdProfile = function(dataUpdate, next) {
	var following = dataUpdate.id_following;
	
	Following.findOne({id_profile: dataUpdate.id_profile}, function(err, list){
		if (err) return next(new Error('Error While finding following...'));
		list.id_following.push(id_following);
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};
/** :updateByUsername:
 * 		will update by username
 * 		will push id_following to array id_following
 * 		will "NOT USE" (because in Following theres no username)
 */
followingPattern.updateByUsername = function(dataUpdate, next) {
	var following = dataUpdate.id_following;
	
	Following.findOne({username: dataUpdate.username}, function(err, list){
		if (err) return next(new Error('Error While finding following...'));
		list.id_following.push(id_following);
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

/** :deleteById:
 * 		will delete by _id Following
 */
followingPattern.deleteById = function(id_following, next) {
	Following.findOneAndRemove({_id: id_following}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};


/** :deleteByIdProfile:
 * 		will delete by id_profile
 */
followingPattern.deleteByIdProfile = function(id_profile, next) {
	Following.findOneAndRemove({id_profile: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};
/** :deleteByUsername:
 * 		will delete by username
 * 		will "NOT USE" (because in Following theres no username)
 */
 followingPattern.deleteByUsername = function(username, next) {
	Following.findOneAndRemove({username: username}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};
module.exports = followingPattern;