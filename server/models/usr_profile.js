var mongoose = require('mongoose')
var schema = mongoose.Schema

var ProfileSchema = new schema({
	id_account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
	},
	username: {
		type: mongoose.Schema.Types.String,
		ref: 'Account',
	},
	email: {
		type: mongoose.Schema.Types.String,
		ref: 'Account',
	},
	full_name: {
		type: String,
		default: '',
	},
	profile_picture: {
		type: String,
		default: '',
	},
	cover_picture: {
		type: String,
		default: '',
	},
	about: {
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

ProfileSchema.pre('save', function(next) {
	var currentDate = new Date()

	// change the updated_at field to current date
	this.updated_at = currentDate

	// if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate
	}
	next()
})

ProfileSchema.pre('update', function(next) {
	this.update({}, {
		$set: { updated_at: new Date() }
	})
	next()
})

module.exports = mongoose.model('Profile', ProfileSchema)
