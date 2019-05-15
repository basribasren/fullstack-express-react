/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
const schema = mongoose.Schema

/**
 * Contact Schema
 * @type {schema}
 */
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

/**
 * Milestone Schema
 * @type {schema}
 */
const Milestone = new schema({
	since: {
		type: Date,
	},
	region: {
		type: String,
		default: 'indonesia',
	},
	location: {
		lang: Number,
		lat: Number,
	},
}, { _id: false })

/**
 * Address Schema
 * @type {schema}
 */
const Address = new schema({
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
}, { _id: false })

/**
 * Profile Schema
 * @type {schema}
 */
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
	address: [Address],
	milestones: [Milestone],
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
