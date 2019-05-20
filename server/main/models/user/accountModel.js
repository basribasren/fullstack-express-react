import mongoose from 'mongoose'
const schema = mongoose.Schema

const AccountSchema = new schema({
	username: {
		type: String,
		lowercase: true,
		trim: true,
		unique: [true, 'Username has already been taken'],
		required: [true, 'Username is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	email: {
		type: String,
		lowercase: true,
		validate: [
			/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
			'please input the right email',
		],
		unique: [true, 'Email has already exist'],
		required: [true, 'Email is required'],
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		lowercase: true,
		required: [true, 'Role is required'],
		default: 'user',
	},
	active: {
		type: Boolean,
		lowercase: true,
		required: [true, 'Status is required'],
		default: false,
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

AccountSchema.pre('save', function(next) {
	console.log('pre save')
	next()
})

AccountSchema.pre('findOneAndUpdate', function(next) {
	console.log('pre update')
	this.update({}, { $set: { updated_at: new Date() } })
	next()
})
const AccountModel = mongoose.model('Account', AccountSchema)

export default AccountModel
