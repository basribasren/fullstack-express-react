import redis from 'redis'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

const onError = () => {
	logger.info('Connected to Redis failed!', {
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
		return_buffers: true
	})
	client.on('error', onError)
	client.once('connect', onConnect)
	client.on('monitor', onMonitor)
	return client
}

export default redisConfig
