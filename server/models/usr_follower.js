var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var FollowerSchema = new schema({
	id_profile: {
		type: mongoose.Schema.Types.ObjectId,
	    ref: 'Profile'
	},
    id_follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
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

FollowerSchema.plugin(AutoIncrement, {inc_field: 'id_usrfollower'});

FollowerSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

FollowerSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});

module.exports = mongoose.model('Follower', FollowerSchema);