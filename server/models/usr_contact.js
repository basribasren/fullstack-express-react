var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var ContactSchema = new schema({
	id_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
	},
	phone_number: [{
        type: String,
        default : undefined
    }],
    github: {
        type: String,
        default : undefined
    },
    facebook: {
        type: String,
        default : undefined
    },
    twitter: {
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

ContactSchema.plugin(AutoIncrement, {inc_field: 'id_usrcontact'});

ContactSchema.pre('save',function(next){
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

ContactSchema.pre('update', function(next) {
    this.update({},{ 
        $set: { updated_at: new Date() } 
    });
    next();
});


module.exports = mongoose.model('Contact', ContactSchema);