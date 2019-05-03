var mongoose = require('mongoose')
var schema = mongoose.Schema

var AccountSchema = new schema({
	username: {
		type: String,
		lowercase: true,
		unique: [true, 'Username has already been taken'],
		required: [true, 'Username is required'],
	},
	password: {
		type: String,
		validate: [/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, 'street number required'],
		required: [true, 'Password is required'],
	},
	email: {
		type: String,
		lowercase: true,
		validate: [/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please input the right email'],
		unique: [true, 'Email has already exist'],
		required: [true, 'Email is required'],
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		required: [true, 'Role is required'],
		default: 'user',
	},
	status: {
		type: String,
		enum: ['active', 'unactive', 'delete'],
		required: [true, 'Status is required'],
		default: 'unactive',
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

AccountSchema.pre('save', function(next) {
	var currentDate = new Date()

	// change the updated_at field to current date
	this.updated_at = currentDate

	// if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate
	}
	next()
})

AccountSchema.pre('update', function(next) {
	this.update({}, {
		$set: { updated_at: new Date() }
	})
	next()
})

module.exports = mongoose.model('Account', AccountSchema)
