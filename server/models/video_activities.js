var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var VideoActivitiesSchema = new schema({
	id_video: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
	},
    bookmark_video: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
	like_video: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	dislike_video: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	comment_video: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	share_video: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	visit_videos: {
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

VideoActivitiesSchema.plugin(AutoIncrement, {inc_field: 'id_videoactivities'});

VideoActivitiesSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

VideoActivitiesSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});

module.exports = mongoose.model('VideoActivities', VideoActivitiesSchema);