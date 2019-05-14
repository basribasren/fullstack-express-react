import mongoose from 'mongoose'
const schema = mongoose.Schema

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
	name: {
		type: String,
		default: '',
		required: [true, 'Full Name is required'],
	},
	logo_picture: {
		type: String,
		default: 'Logo picture not available',
	},
	cover_picture: {
		type: String,
		default: 'Cover picture not available',
	},
	description: {
		type: String,
		default: 'Description not available',
	},
	feature: {
		type: [String],
		default: [],
	},
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
const ProfileModel = mongoose.model('ProfileModel', ProfileSchema)

export default ProfileModel
