var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var SessionSchema = new schema({
	id_profile: {

	},
	ip_address: {
		
	},
	startworth: {
		
	},
	login_time: {
		
	},
    logout_time: {

    },
    longitude: {
    	
    },
    latitude: {
    	
    },
	created_at: {
        type: Date, 
        default: Date.now
    },
    updated_at: {
        type: Date, 
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default : undefined
    }
});
// SessionSchema.plugin(AutoIncrement, {inc_field: 'id'});

SessionSchema.pre('save',function(next){
    var address = this;
    var currentDate = new Date();

    // change the updated_at field to current date
    address.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!address.created_at)
        address.created_at = currentDate;
    next();
});

SessionSchema.pre('update', function(next) {
  this.update({},{ $set: { updated_at: new Date() } });
  next();
});

module.exports = mongoose.model('Register', SessionSchema);