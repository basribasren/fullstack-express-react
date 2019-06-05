// import mongoose from 'mongoose'
// const schema = mongoose.Schema

// const SessionSchema = new schema({
// 	token: {
// 		type: String,
// 		unique: [true, 'Token has already been taken'],
// 		required: [true, 'Token is required'],
// 	},
// 	ttl: {
// 		type: Number,
// 		ttl: true,
// 		default: 1209600,
// 		description: 'time to live in seconds (2 weeks by default)',
// 	},
// 	scopes: {
// 		type: [String],
// 		description: 'Array of scopes granted to this access token.',
// 	},
// 	created_at: {
// 		type: Date,
// 		default: Date.now,
// 	},
// 	updated_at: {
// 		type: Date,
// 		default: Date.now,
// 	},
// 	deleted_at: {
// 		type: Date,
// 	},
// })

// SessionSchema.pre('save', function(next) {
// 	next()
// })

// SessionSchema.pre('findOneAndUpdate', function(next) {
// 	this.update({}, { $set: { updated_at: new Date() } })
// 	next()
// })
// const SessionModel = mongoose.model('Session', SessionSchema)

// export default SessionModel
