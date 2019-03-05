var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var ApiActivitiesSchema = new schema({
	id_api: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Api'
	},
	bookmark_api: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	like_api: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	dislike_api: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	comment_api: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	share_api: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	visit_api: {
		type: Number,
        default: 0
	},
	created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date,
        default : undefined
    }
});

ApiActivitiesSchema.plugin(AutoIncrement, {inc_field: 'id_apiactivities'});

ApiActivitiesSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

ApiActivitiesSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});


module.exports = mongoose.model('ApiActivities', ApiActivitiesSchema);