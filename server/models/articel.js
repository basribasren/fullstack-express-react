var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var ArticelSchema = new schema({
	id_profile: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	},
    id_activities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticelActivities'
    },
	title_articel: {
		type: String,
		required: [true, 'Title is required'],
        unique: [true, 'Title has already been taken']
	},
	cover_articel: {
		type: String,
        default : "/public/img/cover_articel.jpg"
	},
	header_articel: {
		type: String,
        default : undefined
	},
	body_articel: {
		type: String,
        default : undefined
	},
	tag_articel:[{
		type: String,
        default : undefined
	}],
    media_image:[{
        type: String,
        default : undefined
    }],
    source_articel: [{
        title_source: {
            type: String,
            default : undefined
        },
        link_source: {
            type: String,
            default : undefined
        }
    }],
    status_articel:{
        type : String,
        enum : ["draft", "publish", "trash"],
        default : "draft"
    },
    visibility_articel:{
        type : String,
        enum : ["public", "private"],
        default : "public"
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

ArticelSchema.plugin(AutoIncrement, {inc_field: 'id_articel'});

ArticelSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

ArticelSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});

module.exports = mongoose.model('Articel', ArticelSchema);