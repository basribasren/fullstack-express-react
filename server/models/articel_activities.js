var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var ArticelActivitiesSchema = new schema({
	id_articel: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Articel'
	},
	bookmark_articel: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	like_articel: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	dislike_articel: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	comment_articel: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	share_articel: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	}],
	visit_articel: {
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

ArticelActivitiesSchema.plugin(AutoIncrement, {inc_field: 'id_articelactivities'});

ArticelActivitiesSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

ArticelActivitiesSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});

module.exports = mongoose.model('ArticelActivities', ArticelActivitiesSchema);