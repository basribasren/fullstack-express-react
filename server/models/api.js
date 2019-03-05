var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var ApiSchema = new schema({
	id_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	},
	id_activities:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiActivities'
	},
	title_api: {
		type: String,
		required: [true, 'Title is required']
	},
	cover_api: {
		type: String,
        default : "/public/img/cover_api.jpg"
	},
	description_api: {
		type: String,
        default : undefined
	},
	documentation_api: {
		/* link */
		type: String,
        default : undefined
	},
	tos_api: {
		/* link */
		type: String,
        default : undefined
	},
	provider_api: {
		/* company name */
		type: String,
        default : undefined
	},
	ssl_support_api: {
		/* y or n */
		type: String,
		enum: ["yes", "no"]
	},
	unofficial_api: {
		/* y or n */
		type: String,
		enum: ["yes", "no"]
	},
	hypermedia_api: {
		/* y or n */
		type: String,
		enum: ["yes", "no"]
	},
	tag_api:[{
		type: String,
        default : undefined
	}],
	link_api:{
		/* link */
		type: String,
        default : undefined
	},
	status_api:{
        type : String,
        enum : ["draft", "publish", "trash"],
        default : "draft"
    },
    visibility_api:{
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

ApiSchema.plugin(AutoIncrement, {inc_field: 'id_api'});

ApiSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

ApiSchema.pre('update', function(next) {
  	this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});


module.exports = mongoose.model('Api', ApiSchema);