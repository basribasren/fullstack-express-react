var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var RegisterSchema = new schema({
	id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    confirmation_email: {
        type: String,
        required: [true, 'confirmation code is required']
    },
    confirmation_status: {
    	type: String,
        enum: ["confirme", "unconfirm"],
        default: "unconfirm"
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
// RegisterSchema.plugin(AutoIncrement, {inc_field: 'id'});

RegisterSchema.pre('save',function(next){
    var address = this;
    var currentDate = new Date();

    // change the updated_at field to current date
    address.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!address.created_at)
        address.created_at = currentDate;
    next();
});

RegisterSchema.pre('update', function(next) {
  this.update({},{ $set: { updated_at: new Date() } });
  next();
});

module.exports = mongoose.model('Register', RegisterSchema);