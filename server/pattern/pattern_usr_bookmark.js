var Bookmark = require('../models/usr_bookmark');
var bookmarkPattern = {};

/** :getById:
 * 		will findOne by _id bookmark
 * 		will return all value of bookmark with : _id bookmark
 */
bookmarkPattern.getById = function(id_bookmark, next) {
    Bookmark.findOne({_id : id_bookmark})
    .populate('id_profile','_id username')
    .populate('api', '_id title_api updated_at' )
    .populate('id_articel', '_id title_articel updated_at' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Bookmark has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByIdProfile:
 * 		will findOne by id_proile
 * 		will return all value of bookmark with :id_profile
 */
bookmarkPattern.getByIdProfile = function(id_profile, next) {
    Bookmark.findOne({id_profile : id_profile})
    .populate('id_profile','_id username')
    .populate('api', '_id title_api updated_at' )
    .populate('id_articel', '_id title_articel updated_at' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Bookmark has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getAllBookmark:
 * 		will find and return all bookmark
 * 		will using for admin to get list of bookmark
 * 		will return just we need (future)
 */
bookmarkPattern.getAllbookmark = function(next) {
    Bookmark.find({})
    .populate('id_profile','_id username')
    .populate('api', '_id title_api updated_at' )
    .populate('id_articel', '_id title_articel updated_at' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Bookmark has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :getByUsername:
 * 		will findOne by username
 * 		will return all value of bookmark with :username
 * 		will "NOT USE" (because in bookmark theres no username)
 */
bookmarkPattern.getByUsername = function(username, next) {
    Bookmark.findOne({username : username})
    .populate('id_profile','_id username')
    .populate('api', '_id title_api updated_at' )
    .populate('id_articel', '_id title_articel updated_at' )
    .exec(function(err, result){
		if (err) return next(new Error(err.message));

    	if (result == null) {
    		return next(new Error('Bookmark has no exist.. register first'));
    	} else {
    		return next(null, result);
    	} 
	});
};

/** :deleteOneById:
 * 		will delete one api from bookmark by id
 * 		dataDelete fill with 2 value (id_bookmark dan id_api)
 */
bookmarkPattern.deleteOneById = function(dataDelete, next) {
	var api = dataDelete.id_api;

	Bookmark.findOne({_id: dataDelete.id_bookmark}, function(err, list){
		if (err) return next(new Error('Error While finding bookmark...'));
		list.id_api._id(api).removed();
		
		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :deleteOneByIdProfile:
 * 		will delete one api from bookmark by id_profile
 * 		dataDelete fill with 2 value (id_profile dan id_api)
 */
bookmarkPattern.deleteOneByIdProfile = function(dataDelete, next) {
	var api = dataDelete.id_api;

	Bookmark.findOne({id_profile: dataDelete.id_profile}, function(err, list){
		if (err) return next(new Error('Error While finding bookmark...'));		
		list.id_api._id(api).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};

/** :deleteOneByUsername:
 * 		will delete one api from bookmark by username
 * 		dataDelete fill with 2 value (username dan id_api)
 * 		will "NOT USE" (because in bookmark theres no username)
 */
bookmarkPattern.deleteOneByUsername = function(dataDelete, next) {
	var api = dataDelete.id_api;

	Bookmark.findOne({username: dataDelete.username}, function(err, list){
		if (err) return next(new Error('Error While finding bookmark...'));		
		list.id_api._id(api).removed();

		list.save(function (err) {
		  	if (err) return next(new Error('Error While deleting...'));
			next();
		});
	});
};


/** :saveBookmark:
 * 		nothing here
 */

/** :updateById:
 * 		will update by id bookmark
 * 		will push id_api to array id_api
 */
bookmarkPattern.updateById = function(dataUpdate, next) {
	var api = dataUpdate.id_api;

	Bookmark.findOne({_id: dataUpdate.id}, function(err, list){
		if (err) return next(new Error('Error While finding bookmark...'));
		list.id_api.push(api);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

/** :updateByIdProfile:
 * 		will update by id_rpofile
 * 		will push id_api to array id_api
 */
bookmarkPattern.updateByIdProfile = function(dataUpdate, next) {
	var api = dataUpdate.id_api;

	Bookmark.findOne({id_profile: dataUpdate.id_profile}, function(err, list){
		if (err) return next(new Error('Error While finding bookmark...'));
		list.id_api.push(api);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

/** :updateByUsername:
 * 		will update by username
 * 		will push id_api to array id_api
 * 		will "NOT USE" (because in bookmark theres no username)
 */
bookmarkPattern.updateByUsername = function(dataUpdate, next) {
	var api = dataUpdate.id_api;

	Bookmark.findOne({username: dataUpdate.username}, function(err, list){
		if (err) return next(new Error('Error While finding bookmark...'));
		list.id_api.push(api);

		list.save(function (err) {
		  	if (err) return next(new Error('Error While update...'));
			next();
		});
	});
};

/** :deleteById:
 * 		will delete by _id bookmark
 */
bookmarkPattern.deleteById = function(id_bookmark, next) {
	Bookmark.findOneAndRemove({_id: id_bookmark}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByIdProfile:
 * 		will delete by id_profile
 */
bookmarkPattern.deleteByIdProfile = function(id_profile, next) {
	Bookmark.findOneAndRemove({id_profile: id_profile}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

/** :deleteByUsername:
 * 		will delete by username
 * 		will "NOT USE" (because in bookmark theres no username)
 */
bookmarkPattern.deleteByUsername = function(username, next) {
	Bookmark.findOneAndRemove({username: username}, function (err) {
		if (err) return next(new Error('Error While deleting...'));
		next();
		// removed!
	});
};

module.exports = bookmarkPattern;