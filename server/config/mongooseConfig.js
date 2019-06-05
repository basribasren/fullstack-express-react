import mongoose from 'mongoose'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

const onClose = () => {
	logger.warn('connection was closed!', {
		service: 'mongoose',
		method: null,
	})
	return
}

const onReconnect = () => {
	logger.warn('trying reconnect to database...', {
		service: 'mongoose',
		method: null,
	})
	return
}

const onOpen = () => {
	logger.info('successfully connected to database!', {
		service: 'mongoose',
		method: null,
	})
	return
}

const onError = () => {
	logger.error('could not connect to database!', {
		service: 'mongoose',
		method: null,
	})
	return
}

const mongooseConfig = (app) => {
	// app.use(function(req, res, next) {

	// })
	if (process.env.APP_ENV === 'development') {
		mongoose.set('debug', true)
	}
	let configurationV1 = {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		// keepAlive: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 5000, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
	}
	let configurationV2 = {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		// If not connected, return errors immediately rather than waiting for reconnect
		bufferMaxEntries: 0,
		connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
		socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	}
	mongoose.connect(process.env.DB_MONGOODB_URI, configurationV1)
	mongoose.connection.on('error', () => {
		onError()
		mongoose.connection.close()
		// res.status(500).json({ data: [], message: 'could not connect to database!' })
	})
	mongoose.connection.once('close', onClose)
	mongoose.connection.once('reconnect', onReconnect)
	mongoose.connection.once('open', onOpen)
}

export default mongooseConfig
