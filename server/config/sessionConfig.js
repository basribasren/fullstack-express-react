import mongoose from 'mongoose'
import session from 'express-session'
import sessionStore from 'connect-mongo'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

const createStore = () => {
	// Create a session middleware with the given options.
	const MongoStore = sessionStore(session)

	mongoose.connection.on('error', () => {
		logger.error('generate session collection failed!', {
			service: 'mongoose',
			method: null,
		})
		return mongoose.connection.close()
	})
	mongoose.connection.once('open', function() {
		const store = new MongoStore({ mongooseConnection: mongoose.connection })
		return store
	})
}

const sessionConfig = app => {
	const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
	const store = createStore()
	// Configure Express session
	app.use(session({
		secret: 'what the secret',
		resave: true,
		saveUninitialized: true,
		cookie: {
			path: '/',
			secure: false,
			maxAge: expiryDate,
			httpOnly: true,
		},
		store: store
	}))
}

export default sessionConfig
