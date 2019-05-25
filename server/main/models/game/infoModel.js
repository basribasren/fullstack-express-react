/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
const schema = mongoose.Schema

/**
 * ScreenShot schema
 * @type {schema}
 */
const ScreenShot = new schema({
	image: {
		type: String,
		default: '',
	},
}, { _id: false })

/**
 * Demo schema
 * @type {schema}
 */
const Demo = new schema({
	video: {
		type: String,
		default: '',
	},
}, { _id: false })

/**
 * Game Info Schema
 * @type {schema}
 */
const InfoSchema = new schema({
	id_game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game',
		unique: [true, 'id has already been taken'],
		required: [true, 'id is required'],
	},
	description: {
		type: String,
		default: '',
		required: [true, 'id is required'],
	},
	screenshot: [ScreenShot],
	demo: [Demo],
	size: {
		type: String,
		default: '',
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

InfoSchema.pre('save', function(next) {
	next()
})

InfoSchema.pre('findOneAndUpdate', function(next) {
	this.update({}, { $set: { updated_at: new Date() } })
	next()
})

const InfoModel = mongoose.model('Info', InfoSchema)

export default InfoModel
