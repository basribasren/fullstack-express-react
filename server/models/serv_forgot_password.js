var mongoose = require('mongoose');
var schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var ForgotPswdSchema = new schema({
	email_address: {
        type: String,
        lowercase: true,
        validate: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please input the right email'],
        required: [true, 'Email is required']
    },
    confirm_code: {
        type: String,
        required: [true, 'confirmation code is required']
    },    
    created_at: {
        type: Date, 
        default: Date.now
    },
    expired_at: {
        type: Date, 
        default: undefined
    }
    
});

// ForgotPswdSchema.plugin(AutoIncrement, {inc_field: 'id'});

ForgotPswdSchema.pre('save',function(next){
    var address = this;
    var currentDate = new Date();

    // change the updated_at field to current date
    // address.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!address.created_at)
        address.created_at = currentDate;
    next();
});

// ForgotPswdSchema.pre('update', function(next) {
//   this.update({},{ $set: { updated_at: new Date() } });
//   next();
// });

module.exports = mongoose.model('ForgotPswd', ForgotPswdSchema);