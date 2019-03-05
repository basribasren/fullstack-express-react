var Follower = require('../models/usr_follower');
var followerPattern = {};

/** :getById:
 * 		will findOne by _id Follower
 * 		will return all value of Follower with : _id Follower
 */
followerPattern.getById = function(id_follower, next) {
	Follower.findOne({_id : id_follower})
	.populate('id_profile','_id username')
	.populate('id_follower', '_id full_name profile_picture' )
	.exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Follower has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdProfile:
 * 		will findOne by id_proile
 * 		will return all value of Follower with :id_profile
 */
followerPattern.getByIdProfile = function(id_profile, next) {
	Follower.findOne({id_profile : id_profile})
	.populate('id_profile','_id username')
	.populate('id_follower', '_id full_name profile_picture' )
	.exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Follower has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByUsername:
 * 		will findOne by username
 * 		will return all value of Follower with :username
 * 		will "NOT USE" (because in Follower theres no username)
 */
followerPattern.getByUsername = function(username, next) {
	Follower.findOne({username : username})
	.populate('id_profile','_id username')
	.populate('id_follower', '_id full_name profile_picture' )
	.exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Follower has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getAllFollower:
 * 		will find and return all Follower
 * 		will using for admin to get list of Follower
 * 		will return just we need (future)
 */
followerPattern.getAllfollower = function(next) {
	Follower.find({})
	.populate('id_profile','_id username')
	.populate('id_follower', '_id full_name profile_picture' )
	.exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Follower has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :deleteOneById:
 * 		will delete one follower from Follower by id
 * 		dataDelete fill with 2 value (id dan id_follower)
 */
followerPattern.deleteOneById = function(dataDelete, next) {
	var follower = dataDelete.id_follower;

	Follower.findOne({_id: dataDelete.id}, function(err, list){
		if (err) return next(new Error('Error While finding follower...'));
		list.id_follower._id(follower).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :deleteOneByIdProfile:
 * 		will delete one follower from Follower by id_profile
 * 		dataDelete fill with 2 value (id_profile dan id_follower)
 */
followerPattern.deleteOneByIdProfile = function(dataDelete, next) {
	var follower = dataDelete.id_follower;

	Follower.findOne({id_profile: dataDelete.id_profile}, function(err, list){
		if (err) return next(new Error('Error While finding follower...'));
		list.id_follower._id(follower).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :deleteOneByUsername:
 * 		will delete one follower from Follower by username
 * 		dataDelete fill with 2 value (username dan id_follower)
 * 		will "NOT USE" (because in Follower theres no username)
 */
followerPattern.deleteOneByUsername = function(dataDelete, next) {
	var follower = dataDelete.id_follower;

	Follower.findOne({username: dataDelete.username}, function(err, list){
		if (err) return next(new Error('Error While finding follower...'));
		list.id_follower._id(follower).removed();
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :saveFollower:
 * 		nothing here
 */


/** :updateById:
 * 		will update by id Follower
 * 		will push id_follower to array id_follower
 */
followerPattern.updateById = function(dataUpdate, next) {
	var follower = dataUpdate.id_follower;

	Follower.findOne({_id: dataUpdate.id}, function(err, list){
		if (err) return next(new Error('Error While finding follower...'));
		list.id_follower.push(follower);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

/** :updateByIdProfile:
 * 		will update by id_rpofile
 * 		will push id_follower to array id_follower
 */
followerPattern.updateByIdProfile = function(dataUpdate, next) {
	var follower = dataUpdate.id_follower;

	Follower.findOne({id_profile: dataUpdate.id_profile}, function(err, list){
		if (err) return next(new Error('Error While finding follower...'));
		list.id_follower.push(follower);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

/** :updateByUsername:
 * 		will update by username
 * 		will push id_follower to array id_follower
 * 		will "NOT USE" (because in Follower theres no username)
 */
followerPattern.updateByUsername = function(dataUpdate, next) {
	var follower = dataUpdate.id_follower;

	Follower.findOne({username: dataUpdate.username}, function(err, list){
		if (err) return next(new Error('Error While finding follower...'));
		list.id_follower.push(follower);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};


/** :deleteById:
 * 		will delete by _id Follower
 */
followerPattern.deleteById = function(id_follower, next) {
	Follower.findOneAndRemove({_id: id_follower}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByIdProfile:
 * 		will delete by id_profile
 */
followerPattern.deleteByIdProfile = function(id_profile, next) {
	Follower.findOneAndRemove({id_profile: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByUsername:
 * 		will delete by username
 * 		will "NOT USE" (because in Follower theres no username)
 */
followerPattern.deleteByUsername = function(username, next) {
	Follower.findOneAndRemove({username: username}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

module.exports = followerPattern;