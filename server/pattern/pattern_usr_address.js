
var Address = require('../models/usr_address');
var addressPattern = {};

/** :getById:
 * 		will findOne by id_address
 * 		will return all value of address with :id_address
 */
addressPattern.getById = function(id_address, next) {
    Address.findOne({_id : id_address}).populate({ path: 'id_profile', select: '_id username' }).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Address has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdProfile:
 * 		will findOne by username
 * 		will return all value of address with :id_profile
 */
addressPattern.getByIdProfile = function(id_profile, next) {
    Address.findOne({id_profile : id_profile}).populate({ path: 'id_profile', select: '_id username' }).exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Address has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getAllAddress:
 * 		will find and return all Address
 * 		will using for admin to get list of address
 * 		will return just we need (future)
 */
addressPattern.getAllAddress = function(next) {
    Address.find({}).populate({ path: 'id_profile', select: '_id username' }).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Address has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByUsername:
 * 		will findOne by username
 * 		will return all value of address with :username
 * 		will "NOT USE" (because in address theres no username)
 */
addressPattern.getByUsername = function(username, next) {
    Address.findOne({username : username}).populate({ path: 'id_profile', select: '_id username' }).exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Address has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :saveAddres:
 * 		nothing here
 */

/** :updateById:
 * 		will update by _id address
 * 		will set province, city, subdistrict1
 * 		will set subdistrict2, street, and postal_code
 */
addressPattern.updateById = function(address, next) {
	Address.findOneAndUpdate({_id: address._id}, {
    	$set: {
    		province		: address.province,
			city			: address.city,
			subdistrict1	: address.subdistrict1,
			subdistrict2	: address.subdistrict2,
			street			: address.street,
			postal_code		: address.postal_code
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();	  	
	});
};

/** :updateByIdProfile:
 * 		will update by id_profile
 * 		will set province, city, subdistrict1
 * 		will set subdistrict2, street, and postal_code
 */
addressPattern.updateByIdProfile = function(address, next) {
	Address.findOneAndUpdate({id_profile: address.id_profile}, {
    	$set: {
    		province		: address.province,
			city			: address.city,
			subdistrict1	: address.subdistrict1,
			subdistrict2	: address.subdistrict2,
			street			: address.street,
			postal_code		: address.postal_code
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();  	
	});
};

/** :updateByUsername:
 * 		will update by username
 * 		will set province, city, subdistrict1
 * 		will set subdistrict2, street, and postal_code
 * 		will "NOT USE" (because in address theres no username)
 */
addressPattern.updateByUsername = function(address, next) {
	Address.findOneAndUpdate({username: address.username}, {
    	$set: {
    		province		: address.province,
			city			: address.city,
			subdistrict1	: address.subdistrict1,
			subdistrict2	: address.subdistrict2,
			street			: address.street,
			postal_code		: address.postal_code
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();	  	
	});
};

/** :deleteById:
 * 		will delete by id_address
 */
addressPattern.deleteById = function(id_address, next) {
	Address.findOneAndRemove({_id: id_address}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByIdProfile:
 * 		will delete by id_profile
 */
addressPattern.deleteByIdProfile = function(id_profile, next) {
	Address.findOneAndRemove({id_profile: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByUsername:
 * 		will delete by username
 * 		will "NOT USE" (because in address theres no username)
 */
addressPattern.deleteByUsername = function(username, next) {
	Address.findOneAndRemove({username: username}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

module.exports = addressPattern;