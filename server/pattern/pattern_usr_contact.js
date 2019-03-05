
var Contact = require('../models/usr_contact');
var contactPattern = {};

/** :getById:
 * 		will findOne by _id contact
 * 		will return all value of contact with :_id contact
 */
contactPattern.getById = function(id_contact, next) {
    Contact.findOne({_id : id_contact}).populate({ path: 'id_profile', select: '_id username email' }).exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Contact has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdProfile:
 * 		will findOne by username
 * 		will return all value of contact with :id_profile
 */
contactPattern.getByIdProfile = function(id_profile, next) {
    Contact.findOne({id_profile : id_profile}).populate({ path: 'id_profile', select: '_id username email' }).exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Contact has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getAllContact:
 * 		will find and return all Contact
 * 		will using for admin to get list of Contact
 * 		will return just we need (future)
 */
contactPattern.getAllContact = function(next) {
    Contact.find({}).populate({ path: 'id_profile', select: '_id username email' }).exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Contact has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdUsername:
 * 		will findOne by username
 * 		will return all value of contact with :username
 * 		will "NOT USE" (because in contact theres no username)
 */
contactPattern.getByUsername = function(username, next) {
    Contact.findOne({username : username}).populate({ path: 'id_profile', select: '_id username email' }).exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Contact has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};


/** :saveContact:
 * 		nothing here
 */

/** :updateById:
 * 		will update by _id Contact
 * 		will set phone_number, github, facebook, dan twitter
 */
contactPattern.updateById = function(contact, next) {
	Contact.findOneAndUpdate({_id: contact._id}, {
    	$set: {
    		phone_number	: contact.phone_number,
			github			: contact.github,
			facebook		: contact.facebook,
			twitter			: contact.twitter
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();	 
	  	// saved contact!	  	
	});
};

/** :updateByIdProfile:
 * 		will update by id_pofile
 * 		will set phone_number, github, facebook, dan twitter
 */
contactPattern.updateByIdProfile = function(contact, next) {
	Contact.findOneAndUpdate({id_profile: contact.id_profile}, {
    	$set: {
    		phone_number	: contact.phone_number,
			github			: contact.github,
			facebook		: contact.facebook,
			twitter			: contact.twitter
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();	 
	  	// saved contact!	  	
	});
};

/** :updateByUsername:
 * 		will update by username
 * 		will set phone_number, github, facebook, dan twitter
 * 		will "NOT USE" (because in Contact theres no username)
 */
contactPattern.updateByUsername = function(contact, next) {
	Contact.findOneAndUpdate({username: contact.username}, {
    	$set: {
    		phone_number	: contact.phone_number,
			github			: contact.github,
			facebook		: contact.facebook,
			twitter			: contact.twitter
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
		next();	 
	  	// saved contact!	  	
	});
};

/** :deleteById:
 * 		will delete one contact by _id
 */
contactPattern.deleteById = function(id_contact, next) {
	Contact.findOneAndRemove({_id: id_contact}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByIdProfile:
 * 		will delete one contact by id_profile
 */
contactPattern.deleteByIdProfile = function(id_profile, next) {
	Contact.findOneAndRemove({id_profile: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByUsername:
 * 		will delete one contact by username
 * 		will "NOT USE" (because in contact theres no username)
 */
contactPattern.deleteByUsername = function(username, next) {
	Contact.findOneAndRemove({username: username}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

module.exports = contactPattern;