
var Profile = require('../models/usr_profile');
var profilePattern = {};

//get by id
profilePattern.getById = function(id_profile, next) {
    Profile.findOne({_id : id_profile}).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by id_account
profilePattern.getByIdAccount = function(id_account, next) {
    Profile.findOne({id_account : id_account}).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by username
profilePattern.getByUsername = function(username, next) {
    Profile.findOne({username : username}).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get by email
profilePattern.getByEmail = function(email, next) {
    Profile.findOne({email : email}).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};
//get all profile
profilePattern.getAllProfile = function(next) {
    Profile.find({}).exec(function(err, result){
    	if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

//delete by id
profilePattern.deleteById = function(id_profile, next) {
	Profile.findOneAndRemove({_id: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
// delete by username
profilePattern.deleteByUsername = function(username, next) {
	Profile.findOneAndRemove({username: username}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
// delete by id_account
profilePattern.deleteByIdAccount = function(id_account, next) {
	Profile.findOneAndRemove({id_account: id_account}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};
// delete by email
profilePattern.deleteByIdEmail = function(email, next) {
	Profile.findOneAndRemove({email: email}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
        next();
		// removed!
	});
};

//create profile

//update By Id
profilePattern.updateById = function(dataUpdate, next) {
	Profile.findOneAndUpdate({_id: dataUpdate._id}, {
    	$set: {
    		full_name		: dataUpdate.full_name,
			profile_picture	: dataUpdate.profile_picture,
			cover_picture	: dataUpdate.cover_picture,
			about			: dataUpdate.about
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next();  	
	});
};
//Update By Id_account
profilePattern.updateByIdAccount = function(dataUpdate, next) {
	Profile.findOneAndUpdate({id_account: dataUpdate.id_account}, {
    	$set: {
    		full_name		: dataUpdate.full_name,
			profile_picture	: dataUpdate.profile_picture,
			cover_picture	: dataUpdate.cover_picture,
			about			: dataUpdate.about
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};
//Update By Username
profilePattern.updateByUsername = function(dataUpdate, next) {
	Profile.findOneAndUpdate({username: dataUpdate.username}, {
    	$set: {
    		full_name		: dataUpdate.full_name,
			profile_picture	: dataUpdate.profile_picture,
			cover_picture	: dataUpdate.cover_picture,
			about			: dataUpdate.about
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};
//Update By Email
profilePattern.updateByEmail = function(dataUpdate, next) {
	Profile.findOneAndUpdate({email: dataUpdate.email}, {
    	$set: {
    		full_name		: dataUpdate.full_name,
			profile_picture	: dataUpdate.profile_picture,
			cover_picture	: dataUpdate.cover_picture,
			about			: dataUpdate.about
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};

//update full_name
profilePattern.updateFullName = function(dataUpdate, next) {
	Profile.findOneAndUpdate({_id: dataUpdate._id}, {
    	$set: {
    		full_name		: dataUpdate.full_name
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};

//update profile_picture by id
profilePattern.updatePicture = function(dataUpdate, next) {
	Profile.findOneAndUpdate({_id: dataUpdate._id}, {
    	$set: {
    		profile_picture	: dataUpdate.profile_picture
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};

//update cover_picture by id
profilePattern.updateCover = function(dataUpdate, next) {
	Profile.findOneAndUpdate({_id: dataUpdate._id}, {
    	$set: {
    		cover_picture	: dataUpdate.cover_picture
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};

//update about by id
profilePattern.updateAbout = function(dataUpdate, next) {
	Profile.findOneAndUpdate({_id: dataUpdate._id}, {
    	$set: {
    		about			: dataUpdate.about
    	}
    }, function (err) {
	  	if (err) return next(new Error('Error While update...'));
        next(); 	  	
	});
};

module.exports = profilePattern;