import mongoose from 'mongoose'
const schema = mongoose.Schema

/* eslint-disable prettier/prettier */
const Contact = new schema({
	contact: {
		type: String,
		default: '',
	},
	category: {
		type: String,
		default: '',
	},
}, { _id: false })

const ProfileSchema = new schema({
	id_account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
		unique: [true, 'id has already been taken'],
		required: [true, 'id is required'],
	},
	username: {
		type: mongoose.Schema.Types.String,
		ref: 'Account',
		unique: [true, 'username has already been taken'],
		required: [true, 'username is required'],
	},
	email: {
		type: mongoose.Schema.Types.String,
		ref: 'Account',
		unique: [true, 'email has already been taken'],
		required: [true, 'email is required'],
	},
	name: {
		type: String,
		default: '',
		required: [true, 'Full Name is required'],
	},
	logo_image: {
		type: String,
		default: 'Logo image not available',
	},
	cover_image: {
		type: String,
		default: 'Cover image not available',
	},
	description: {
		type: String,
		default: 'Description not available',
	},
	feature: {
		type: [String],
		default: [],
	},
	contacts: [Contact],
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
	deleted_at: {
		type: Date,
	},
})

ProfileSchema.pre('save', function(next) {
	console.log('pre save')
	next()
})

ProfileSchema.pre('findOneAndUpdate', function(next) {
	console.log('pre update')
	this.update({}, { $set: { updated_at: new Date() } })
	next()
})
const ProfileModel = mongoose.model('Profile', ProfileSchema)

export default ProfileModel
