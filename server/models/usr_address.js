var mongoose = require('mongoose')
var schema = mongoose.Schema

var AddressSchema = new schema({
	id_profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile',
	},
	province: {
		type: String,
		default: '',
	},
	city: {
		type: String,
		default: '',
	},
	subdistrict1: {
		type: String,
		default: '',
	},
	subdistrict2: {
		type: String,
		default: '',
	},
	street: {
		type: String,
		default: '',
	},
	postal_code: {
		type: String,
		default: '',
	},
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date,
	},
	deleted_at: {
		type: Date,
	},
})

AddressSchema.pre('save', function(next) {
	var currentDate = new Date()

	// change the updated_at field to current date
	this.updated_at = currentDate

	// if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate
	}
	next()
})

AddressSchema.pre('update', function(next) {
	this.update({}, {
		$set: { updated_at: new Date() }
	})
	next()
})

module.exports = mongoose.model('Address', AddressSchema)
