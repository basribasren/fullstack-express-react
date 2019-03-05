var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var VideoSchema = new schema({
	id_profile: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	},
	title_video: {
		type: String,
		required: [true, 'Title is required']
	},
	cover_video: {
		type: String,
        default : "/public/img/cover_video.jpg"
	},
	body_video: {
		type: String,
        default : undefined
	},
	tag_video:[{
		type: String,
        default : undefined
	}],
	link_video:{
		type: String,
        default : undefined
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

VideoSchema.plugin(AutoIncrement, {inc_field: 'id_video'});

VideoSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

VideoSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});

module.exports = mongoose.model('Video', VideoSchema);