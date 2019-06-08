import util from 'util'
import redis from 'redis'
import winstonLogger from '@config/winston.config.js'

const logger = winstonLogger

/**
 * This is a complete and feature rich Redis client for node.js. 
 * It supports all Redis commands and focuses on high performance.
 * if connection error redis will always trying reconnect in background,
 * don't need close connection when error
 * @return {[type]} [description]
 */
const onError = () => {
	logger.error('Connected to Redis failed!', {
		service: 'redis',
		method: null,
	})
	return
}

const onConnect = () => {
	logger.info('Connected to Redis...', {
		service: 'redis',
		method: null,
	})
	return
}

const onMonitor = (time, args) => {
	let message = time + ': ' + util.inspect(args)
	logger.info('Connected to Redis...', {
		service: 'redis',
		method: null,
	})
	return
}

const redisConfig = () => {
	const client = redis.createClient({
		return_buffers: true,
	})
	client.on('error', onError)
	client.once('connect', onConnect)
	client.on('monitor', onMonitor)
	return client
}

export default redisConfig
