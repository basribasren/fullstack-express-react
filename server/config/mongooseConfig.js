import mongoose from 'mongoose'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

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

const mongooseConfig = () => {
	if (process.env.APP_ENV === 'development') {
		mongoose.set('debug', true)
	}
	let configuration = {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		keepAlive: true,
		autoReconnect: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 1000, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
	}
	mongoose.connect(process.env.DB_MONGOODB_URI, configuration)
	mongoose.connection.on('error', () => {
		onError()
		mongoose.connection.close()
	})
	mongoose.connection.on('connected', () => {
		onOpen()
	})
	mongoose.connection.on('disconnected', () => {
		onReconnect()
		mongoose.connect(process.env.DB_MONGOODB_URI, configuration)
	})
	return mongoose
}

export default mongooseConfig
/**
states: [Object: null prototype] {
		'0': 'disconnected',
		'1': 'connected',
		'2': 'connecting',
		'3': 'disconnecting',
		'99': 'uninitialized',
		disconnected: 0,
		connected: 1,
		connecting: 2,
		disconnecting: 3,
		uninitialized: 99
	}

_events: [Object: null prototype] {
	error: [Function],
	connected: {
		[Function: bound onceWrapper] listener: [Function]
	},
	close: {
		[Function: bound onceWrapper] listener: [Function]
	},
	reconnected: [Function],
	disconnected: [Function]
}
*/
