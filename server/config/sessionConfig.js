import mongoose from 'mongoose'
import session from 'express-session'
/**
 * define driver in server-dev.js
 * choose just one connector by driver
 * you can comment another one
 */
import mongoStore from 'connect-mongo'
import redisStore from 'connect-redis'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

/**
 * session will store in database
 * so for the first initial we need cek the connection
 * @return {[type]} [description]
 */
const cekConnectionMongoose = () => {
	let connection = mongoose.connection.readyState
	let status
	if (connection === 0 || connection === 3) {
		logger.error('generate session collection failed!', {
			service: 'mongoose',
			method: null,
		})
		mongoose.connection.close()
		return status = false
	} else {
		return status = true
	}
	return status
}

/**
 * generate store by driver
 * driver can be mongoose or redis
 * @param  {[type]} driver [description]
 * @return {[type]}        [description]
 */
const generateStore = driver => {
	if (driver === 'mongoose') {
		let status = cekConnectionMongoose()
		if (status) {
			const NewStore = mongoStore(session)
			const store = new NewStore({ mongooseConnection: mongoose.connection })
			return store
		}
	} else if (driver === 'redis') {
		const NewStore = redisStore(session)
		const store = new NewStore({ host: 'localhost', port: 6379, ttl: 260 })
		return store
	} else {
		logger.error('generate session store failed!', {
			service: 'session',
			method: null,
		})
		return
	}
}

/**
 * use session if store succesfully create
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
const sessionConfig = (app, driver) => {
	const store = generateStore(driver)
	const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

	if (store) {
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
	return app
}

export default sessionConfig
