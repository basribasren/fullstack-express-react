
const Account 	= require('../models/usr_account');
const Address 	= require('../models/usr_address');
const Bookmark 	= require('../models/usr_bookmark');
const Contact 	= require('../models/usr_contact');
const Follower 	= require('../models/usr_follower');
const Following = require('../models/usr_following');
const Profile 	= require('../models/usr_profile');

const accountPattern = {};

/** :getById:
 * 		will findOne by id
 * 		will return all value of account with :id
 */
accountPattern.getById = function(id_account, next) {
    Account.findOne({_id : id_account}, function(err, account){
		if (err) return next(new Error(err.message));

    	if (account == null) {
    		return next(new Error('Account has no exist.. register first'));
    	} else {
    		return next(null, account);
    	}  
	});
};

/** :getByUsername:
 * 		will findOne by username
 * 		will return password of account with :username
 */
accountPattern.getByUsername = function(username_account, next) {
    Account.findOne({username : username_account}, function(err, account){
    	if (err) return next(new Error(err.message));

    	if (account == null) {
    		return next(new Error('Account has no exist.. register first'));
    	} else {
    		return next(null, account.password);
    	}    	
    });
};

/** :getByEmail:
 * 		will findOne by email
 * 		will return status and role of account with :email
 */
accountPattern.getByEmail = function(email_account, next) {
    Account.findOne({email : email_account}, function(err, account){
		if (err) return next(new Error(err.message));

    	if (account == null) {
    		return next(new Error('Account has no exist.. register first'));
    	} else {
    		var result = {
    			status : account.status,
    			role : account.role
    		};
    		return next(null, result);
    	}  
	});
};

/** :getByRole:
 * 		will find by role
 * 		will return all account with :role
 * 		will using for admin serch user with :role
 * 		will return just we need (future)
 */
accountPattern.getByRole = function(role_account, next) {
    Account.find({role : role_account}, function(err, account){
		if (err) return next(new Error(err.message));

    	if (account == null) {
    		return next(new Error('Account has no exist.. register first'));
    	} else {
    		return next(null, account);
    	}  
	});
};

/** :getByStatus:
 * 		will find by status
 * 		will return all account with :status
 * 		will using for admin serch user with :status
 * 		will return just we need (future)
 */
accountPattern.getByStatus = function(status_account, next) {
    Account.find({status : status_account}, function(err, account){
		if (err) return next(new Error(err.message));

    	if (account == null) {
    		return next(new Error('Account has no exist.. register first'));
    	} else {
    		return next(null, account);
    	}  
	});
};

/** :getAllAccount:
 * 		will find all account
 * 		will return all account
 * 		will using for admin to get list of account
 * 		will return just we need (future)
 */
accountPattern.getAllAccount = function(next) {
    Account.find({}, function(err, account){
		if (err) return next(new Error(err.message));

    	if (account == null) {
    		return next(new Error('Account has no exist.. register first'));
    	} else {
    		return next(null, account);
    	}  
	});
};

/** :saveAccount:
 * 		will create account
 * 		will initialize profile
 * 		will initialize address
 * 		will initialize bookmark
 * 		will initialize contact
 * 		will initialize follower
 * 		will initialize following
 * 		will using for user create account
 */
accountPattern.saveAccount = function(account, next) {
	var newAccount = new Account({
		username: account.username,
		password: account.password,
		email: account.email,
		role: account.role,
		status: account.status
	});
    Account.create(newAccount, function (err, user) {
	  	if (err) return next(new Error(err.message));

	  	// saved account!

	  	var newProfile = new Profile({
		    id_account: user._id,  		// assign the _id from the account
		    username: user.username,    	// assign the _id from the account
		    email: user.email    	// assign the _id from the account
		});
		Profile.create(newProfile, function (err, profile) {
		    if (err) return next(new Error(err.message));
		    
	    	var newAddress = new Address({
			    id_profile: profile._id,    	// assign the _id from the profile
			});
			  
			Address.create(newAddress, function (err) {
			    if (err) return next(new Error(err.message));
			    // saved address!
			});
			/* save ref contact */
			var newContact = new Contact({
			    id_profile: profile._id,    	// assign the _id from the profile	
			});
			  
			Contact.create(newContact, function (err) {
			    if (err) return next(new Error(err.message));
			    // saved contact!
			});
			/* save ref bookmark */
			var newBookmark = new Bookmark({
			    id_profile: profile._id,    	// assign the _id from the profile
			});
			  
			Bookmark.create(newBookmark, function (err) {
			    if (err) return next(new Error(err.message));
			    // saved bookmark!
			});
			/* save ref follower */
			var newFollower = new Follower({
			    id_profile: profile._id,    	// assign the _id from the profile
			});
			  
			Follower.create(newFollower, function (err) {
			    if (err) return next(new Error(err.message));
			    // saved follower!
			});
			/* save ref following */
			var newFollowing = new Following({
			    id_profile: profile._id,    	// assign the _id from the profile
			});
			  
			Following.create(newFollowing, function (err) {
			    if (err) return next(new Error(err.message));
			    // saved following!
			});
		});
	next();
	});
};

/** :updateById:
 * 		will update by id account
 * 		will set password and status
 */
accountPattern.updateById = function(dataUpdate, next) {
	Account.findOneAndUpdate({_id: dataUpdate._id}, {
		$set: {
			password: dataUpdate.password,
			status: dataUpdate.status
		}
	}, function(err){
		if (err) return next(new Error('Error While update...'));
		next();
  		//update
	});
};

/** :updateByUsername:
 * 		will update by username account
 * 		will set password
 */
accountPattern.updateByUsername = function(dataUpdate, next) {
	Account.findOneAndUpdate({username: dataUpdate.username}, {
		$set: {
			password: dataUpdate.password
		}
	}, function(err){
		if (err) return next(new Error('Error While update...'));
		next();
  		//update
	});
};

/** :updateByEmail:
 * 		will update by email account
 * 		will set password, role and status
 */
accountPattern.updateByEmail = function(dataUpdate, next) {
	Account.findOneAndUpdate({email: dataUpdate.email}, {
		$set: {
			password: dataUpdate.password,
			role : dataUpdate.role,
			status: dataUpdate.status
		}
	}, function(err){
		if (err) return next(new Error('Error While update...'));
		next();
  		//update
	});
};


/** :deleteById:
 * 		will delete by id account
 */
accountPattern.deleteById = function(id_account, next) {
	Account.findOneAndRemove({_id: id_account}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByUsername:
 * 		will delete by username account
 */
accountPattern.deleteByUsername = function(username_account, next) {
	Account.findOneAndRemove({username: username_account}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByEmail:
 * 		will delete by email account
 */
accountPattern.deleteByEmail = function(email_account, next) {
	Account.findOneAndRemove({email: email_account}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByRole:
 * 		will delete all with role account
 */
accountPattern.deleteByRole = function(role_account, next) {
	Account.find({ role: role_account }, function (err, accountByRole) {
	  	if (err) return next(new Error('Error While finding account with role...'));
	  	
	  	accountByRole.remove({}, function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		  	// removed!
		});
	});
};

/** :deleteByStatus:
 * 		will delete all with status account
 */
accountPattern.deleteByStatus = function(status_account, next) {
	Account.find({ status: status_account }, function (err, accountByStatus) {
	  	if (err) return next(new Error('Error While finding account with status...'));

	  	accountByStatus.remove({}, function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		  	// removed!
		});
	});
};

module.exports = accountPattern;



// Option Find One And Update
// new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
// upsert: bool - creates the object if it doesn't exist. defaults to false.
// fields: {Object|String} - Field selection. Equivalent to .select(fields).findOneAndUpdate()
// maxTimeMS: puts a time limit on the query - requires mongodb >= 2.6.0
// sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
// runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
// setDefaultsOnInsert: if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's $setOnInsert operator.
// passRawResult: if true, passes the raw result from the MongoDB driver as the third callback parameter
// strict: overwrites the schema's strict mode option for this update
// runSettersOnQuery: bool - if true, run all setters defined on the associated model's schema for all fields defined in the query and the update.


//Option Find One And Remove
// sort: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
// select: sets the document fields to return
// passRawResult: if true, passes the raw result from the MongoDB driver as the third callback parameter
// strict: overwrites the schema's strict mode option for this update