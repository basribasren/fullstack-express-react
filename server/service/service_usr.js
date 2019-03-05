
var account 	= require('../pattern/pattern_usr_account');
var address 	= require('../pattern/pattern_usr_address');
var bookmark 	= require('../pattern/pattern_usr_bookmark');
var contact 	= require('../pattern/pattern_usr_contact');
var follower 	= require('../pattern/pattern_usr_follower');
var following 	= require('../pattern/pattern_usr_following');
var profile 	= require('../pattern/pattern_usr_profile');
var bcrypt 		= require('bcryptjs');

var userService = {};

//get limit and new following /this is for user list following/

/** :registerUSER:
 * 		require bcryptjs for generate salt and doing hash	
 * 		will save the password.hash will all dataRegister in mongodb
 */
userService.registerUser = function(dataRegister, next){
	bcrypt.genSalt(10, function(err, salt) {
	    
	    bcrypt.hash(dataRegister.password, salt, function(err, hash) {
	        if (err) return next(new Error('Error while hash the password'));
			
			dataRegister.password = hash;
			account.saveAccount(dataRegister, function(err){
				if(err) return next(new Error(err.message));
				next();
			});
	    });
	});
};

/** :loginUSER:
 * 		require bcryptjs for compare the input password and hash	
 * 		will return the boolean isMatch
 */
userService.loginUser = function(dataLogin, next){
	account.getByUsername(dataLogin.username, function(err, akun){
		if(err) { return next(new Error(err.message)); }

		bcrypt.compare(dataLogin.password, akun, function(err, isMatch) {
			if(err) return next(new Error(err.message));
			
			if (isMatch == true) {
	    		return next(null, isMatch);
	    	} else {
	    		return next(new Error('password not match..'));
	    	} 
		});
	});
};

/** :getHOMEPAGE:
 * 		will user profile.getByUsername(username)	
 * 		will return the profile
 */
userService.getHomePage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has not exist.. register first'));
    	} else {
    		return next(null, profile);
    	} 
	});
};

/** :getPROFILEPAGE:
 * 		will user profile.getByUsername(username)	
 * 		will user address.getByIdProfile(profile._id)	
 * 		will user bookmark.getByIdProfile(profile._id)	
 * 		will user contact.getByIdProfile(profile._id)	
 * 		will user follower.getByIdProfile(profile._id)	
 * 		will user following.getByIdProfile(profile._id)	
 * 		will return all
 * 		will return just what we need (future)
 */
 /** :updatePROFILE :
 */
userService.getProfilePage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has not exist.. register first'));
    	} else {
    		address.getByIdProfile(profile._id, function(err, address){
				if (err) return next(new Error(err.message));

			bookmark.getByIdProfile(profile._id, function(err, bookmark){
				if (err) return next(new Error(err.message));
				
			contact.getByIdProfile(profile._id, function(err, contact){
				if (err) return next(new Error(err.message));

			follower.getByIdProfile(profile._id, function(err, follower){
				if (err) return next(new Error(err.message));

			following.getByIdProfile(profile._id, function(err, following){
				if (err) return next(new Error(err.message));
				
				return next(null, profile, contact, address, bookmark, following, follower);
			});/*following*/ });/*follower*/ });/*contact*/ });/*bookmark*/ });/*address*/
    	}		
	});
};

userService.updateProfileUser = function(dataUpdateProfile, next){
	profile.getByUsername(dataUpdateProfile.username, function(err, resultProfile){
	    if (err) return next(new Error(err.message));
	    var data = {
	    	_id 			: resultProfile._id,
	    	full_name 		: dataUpdateProfile.full_name,
			profile_picture	: dataUpdateProfile.profile_picture,
			cover_picture	: dataUpdateProfile.cover_picture,
			about 			: dataUpdateProfile.about
	    };
	    if (dataUpdateProfile.part == "fullname") {
	    	profile.updateFullName(data, function(err){
	    		if (err) return next(new Error(err.message));
	    		next();
	    	});
	    } else if(dataUpdateProfile.part == "picture"){
	    	profile.updatePicture(data, function(err){
	    		if (err) return next(new Error(err.message));
	    		next();
	    	});
	    } else if(dataUpdateProfile.part == "cover"){
	    	profile.updateCover(data, function(err){
	    		if (err) return next(new Error(err.message));
	    		next();
	    	});
	    } else if(dataUpdateProfile.part == "about"){
	    	profile.updateAbout(data, function(err){
	    		if (err) return next(new Error(err.message));
	    		next();
	    	});
	    } else {
	    	next(new Error("what are u trying to do?"));
	    }
	return next();
	});
};

/** :getBOOKMARKPAGE:
 * 		will user profile.getByUsername(username)		
 * 		will user bookmark.getByIdProfile(profile._id)
 * 		will return profile and bookmark
 * 		will return just what we need (future)
 */
userService.getBookmarkPage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		bookmark.getByIdProfile(profile._id, function(err, bookmark){
				if (err) return next(new Error(err.message));
				
				return next(null, profile, bookmark);
			});
    	}
	});
};

/** :getFOLLOWERPAGE:
 * 		will user profile.getByUsername(username)		
 * 		will user follower.getByIdProfile(profile._id)	
 * 		will return profile and follower
 * 		will return just what we need (future)
 */
userService.getFollowerPage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		follower.getByIdProfile(profile._id, function(err, follower){
				if (err) return next(new Error(err.message));
				
				return next(null, profile, follower);
			});
    	} 
	});
};

/** :getFOLLOWINGPAGE:
 * 		will user profile.getByUsername(username)	
 * 		will user following.getByIdProfile(profile._id)	
 * 		will return profile and following
 * 		will return just what we need (future)
 */
userService.getFollowingPage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		following.getByIdProfile(profile._id, function(err, following){
				if (err) return next(new Error(err.message));
				
				return next(null, profile, following);
			});
    	}
	});
};

/** :getSETTINGACCOUNTPAGE:
 * 		will user profile.getByUsername(username)	
 * 		will user address.getById(profile.id_account)
 * 		will return profile and account
 * 		will return just what we need (future)
 */
 /** :updateACCOUNTUSER:
 * 		will use bcrypt for generate salt and hash for new password	
 * 		will update account use updateByUsername(dataUpdateAccount)
 * 		will return message flash <info update> (future)
 */
userService.getSettingAccountPage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		account.getById(profile.id_account, function(err, account){
				if (err) return next(new Error(err.message));
								
				return next(null, profile, account);
			});
    	}
	});
};

userService.updateAccountUser = function(dataUpdateAccount, next){

	bcrypt.genSalt(10, function(err, salt) {		
	    bcrypt.hash(dataUpdateAccount.password, salt, function(err, hash) {
	        if (err) return next(new Error(err.message));
			
			dataUpdateAccount.password = hash;
			account.updateByUsername(dataUpdateAccount, function(err){
				if(err) return next(new Error(err.message));

				next();
			});
	    });
	});
};

/** :getSETTINGCONTACTPAGE:
 * 		will user profile.getByUsername(username)		
 * 		will user contact.getByIdProfile(profile._id)	
 * 		will return profile and contact
 * 		will return just what we need (future)
 */
 /** :updateCONTACTUSER:
 * 		will update contact use updateByUsername(dataUpdateAccount)
 * 		will return message flash <info update> (future)
 */
userService.getSettingContactPage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		contact.getByIdProfile(profile._id, function(err, contact){
				if (err) return next(new Error(err.message));

				return next(null, profile, contact);
			});
    	} 
	});
};

userService.updateContactUser = function(dataUpdateContact, next){
	contact.updateByUsername(dataUpdateContact, function(err){
		if(err) return next(new Error(err.message));

		next();
	});
};
/** :getSETTINGADDRESSPAGE:
 * 		will user profile.getByUsername(username)	
 * 		will user address.getByIdProfile(profile._id)
 * 		will return profile and address
 * 		will return just what we need (future)
 */
 /** :updateADDRESSUSER:
 * 		will update address use updateByUsername(dataUpdateAddress)
 * 		will return message flash <info update> (future)
 */
userService.getSettingAddressPage = function(username, next){
	// console.log(username);
	profile.getByUsername(username, function(err, profile){
		if (err) return next(new Error(err.message));

		if (profile == null) {
    		return next(new Error('Profile has no exist.. register first'));
    	} else {
    		address.getByIdProfile(profile._id, function(err, address){
				if (err) return next(new Error(err.message));

				return next(null, profile, address);
			});
    	} 
	});
};

userService.updateAddressUser = function(dataUpdateAddress, next){
	address.updateByUsername(dataUpdateAddress, function(err){
		if(err) return next(new Error(err.message));
		
		next();
	});
};

/** :deleteACCOUNTUSER:
 * 		will delete account
 * 		will return message flash <info delete> (future)
 */
userService.deleteAccountUser = function(username, next){
	profile.getByUsername(username, function(err, result){
		if(err) return next(new Error(err.message));

		var id_profile = result._id;
		var id_account = result.id_account;

		account.deleteById(id_account, function(err){
			if(err) return next(new Error(err.message));
			console.log("1. account delete");
			next();
		});

		profile.deleteById(id_profile, function(err){
			if(err) return next(new Error(err.message));
			console.log("2. profile delete");
			next();
		});
		address.deleteByIdProfile(id_profile, function(err){
			if(err) return next(new Error(err.message));
			console.log("3. address delete");
			next();
		});
		bookmark.deleteByIdProfile(id_profile, function(err){
			if(err) return next(new Error(err.message));
			console.log("4. bookmark delete");
			next();
		});
		contact.deleteByIdProfile(id_profile, function(err){
			if(err) return next(new Error(err.message));
			console.log("5. contact delete");
			next();
		});
		follower.deleteByIdProfile(id_profile, function(err){
			if(err) return next(new Error(err.message));
			console.log("6. follower delete");
			next();
		});
		following.deleteByIdProfile(id_profile, function(err){
			if(err) return next(new Error(err.message));
			console.log("7. following delete");
			next();
		});
	return next();
	});
};

/** :updateGENREAL (future):
 * 		will user profile.getByUsername(username)	
 * 		will user address.getByIdProfile(profile._id)	
 * 		will user bookmark.getByIdProfile(profile._id)	
 * 		will user contact.getByIdProfile(profile._id)	
 * 		will user follower.getByIdProfile(profile._id)	
 * 		will user following.getByIdProfile(profile._id)	
 * 		will return all
 * 		will return just what we need (future)
 */

//count bookmark
//count follower
//count following

//get limit and new user /this is for admin list user/
userService.getSortUser = function(role, next){
	account.getByRole(role).limit(25).sort({'created_at':-1}).exec(function(err, sortUser){
		if (err) return next(new Error(err.message));

		if (sortUser == null) {
    		return next(new Error('List Account has no exist..'));
    	} else {
    		return next(null, sortUser);
    	} 
	});
};
//get limit and new bookmark /this is for user list bookmark/
userService.getSortBookmark = function(next){
	bookmark.getAllbookmark().limit(25).sort({'created_at':-1}).exec(function(err, sortBookmark){
		if (err) return next(new Error(err.message));

		if (sortBookmark == null) {
    		return next(new Error('List bookmark has no exist..'));
    	} else {
    		return next(null, sortBookmark);
    	} 
	});
};
//get limit and new follower /this is for user list follower/
userService.getSortFollower = function(next){
	follower.getAllfollower().limit(25).sort({'created_at':-1}).exec(function(err, sortFollower){
		if (err) return next(new Error(err.message));

		if (sortFollower == null) {
    		return next(new Error('List follower has no exist..'));
    	} else {
    		return next(null, sortFollower);
    	} 
	});
};


module.exports = userService;