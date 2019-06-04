import Boom from '@hapi/boom'
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
	throw new Error('could not connect to database!')
}

const mongooseConfig = () => {
	if (process.env.APP_ENV === 'development') {
		mongoose.set('debug', true)
	}
	mongoose.connect(process.env.DB_MONGOODB_URI, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		socketTimeoutMS: 0,
		keepAlive: true,
		reconnectTries: 5,
	})
	const connection = mongoose.connection
	connection.on('error', () => {
		onError()
	})
	connection.once('close', onClose)
	connection.once('reconnect', onReconnect)
	connection.once('open', onOpen)
	return mongoose
}

export default mongooseConfig
