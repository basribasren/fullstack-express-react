/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
const schema = mongoose.Schema

const ListGame = new schema({
	id_game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game',
		unique: [true, 'id has already been taken'],
		required: [true, 'id is required'],
	},
}, { _id: false })

const ListSchema = new schema({
	id_profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile',
		unique: [true, 'id has already been taken'],
		required: [true, 'id is required'],
	},
	list_game: [ListGame],
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

ListSchema.pre('save', function(next) {
	next()
})

ListSchema.pre('findOneAndUpdate', function(next) {
	this.update({}, { $set: { updated_at: new Date() } })
	next()
})

const ListModel = mongoose.model('List', ListSchema)

export default ListModel
