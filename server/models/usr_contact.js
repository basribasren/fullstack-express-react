var mongoose = require('mongoose')
var schema = mongoose.Schema

var ContactSchema = new schema({
	id_profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile',
	},
	phone_number: [
		{
			type: String,
			default: '',
		},
	],
	github: {
		type: String,
		default: '',
	},
	facebook: {
		type: String,
		default: '',
	},
	twitter: {
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

ContactSchema.pre('save', function(next) {
	var currentDate = new Date()

	// change the updated_at field to current date
	this.updated_at = currentDate

	// if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate
	}
	next()
})

ContactSchema.pre('update', function(next) {
	this.update({}, {
		$set: { updated_at: new Date() }
	})
	next()
})

module.exports = mongoose.model('Contact', ContactSchema)
