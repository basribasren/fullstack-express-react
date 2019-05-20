import mongoose from 'mongoose'
const schema = mongoose.Schema

/**
 * Profile Schema
 * @type {schema}
 */
const GameSchema = new schema({
	id_info: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Info',
		unique: [true, 'id has already been taken'],
	},
	title: {
		type: String,
		default: '',
		required: [true, 'Title of game is required'],
	},
	logo_image: {
		type: String,
		default: 'Logo image not available',
	},
	cover_image: {
		type: String,
		default: 'Cover image not available',
	},
	url: {
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

GameSchema.pre('save', function(next) {
	console.log('pre save')
	next()
})

GameSchema.pre('findOneAndUpdate', function(next) {
	console.log('pre update')
	this.update({}, { $set: { updated_at: new Date() } })
	next()
})
const GameModel = mongoose.model('Game', GameSchema)

export default GameModel
