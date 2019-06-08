import mongoose from 'mongoose'
const schema = mongoose.Schema

const SessionSchema = new schema({
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

SessionSchema.pre('save', function(next) {
	next()
})

SessionSchema.pre('findOneAndUpdate', function(next) {
	this.update({}, { $set: { updated_at: new Date() } })
	next()
})
const SessionModel = mongoose.model('Session', SessionSchema)

export default SessionModel
