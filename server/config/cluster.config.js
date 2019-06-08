import cluster from 'cluster'
import os from 'os'
import winstonLogger from '@config/winston.config.js'

const numCPUs = os.cpus().length
const logger = winstonLogger

/**
 * when worker on exit
 * @param  {[type]} worker [description]
 * @param  {[type]} code   [description]
 * @param  {[type]} signal [description]
 * @return {[type]}        [description]
 */
const onExit = (worker, code, signal) => {
	if (signal) {
		logger.warn(`worker #${worker.id} was killed by signal: ${signal}`, {
			service: 'cluster',
			method: null,
		})
		return
	} else if (code !== 0) {
		logger.warn(`worker #${worker.id} exited with error code: ${code}`, {
			service: 'cluster',
			method: null,
		})
		return
	} else {
		logger.warn(`worker #${worker.id} has died`, {
			service: 'cluster',
			method: null,
		})
		return
	}
}

/**
 * when worker on listening
 * @param  {[type]} worker  [description]
 * @param  {[type]} address [description]
 * @return {[type]}         [description]
 */
const onListening = (worker, address) => {
	logger.info(`worker #${worker.id} listening on ${address.address}:${address.port}`, {
		service: 'cluster',
		method: null,
	})
	return
}

/**
 * when worker on disconnect
 * @param  {[type]} worker [description]
 * @return {[type]}        [description]
 */
const onDisconnect = worker => {
	logger.warn(`worker #${worker.id} has disconnect`, {
		service: 'cluster',
		method: null,
	})
	return
}

/**
 * main configuration of cluster
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
const clusterConfig = app => {
	if (cluster.isMaster) {
		logger.info(`master ${process.pid} is running`, {
			service: 'cluster',
			method: null,
		})
		// Fork workers.
		for (let i = 0; i < numCPUs; i++) {
			cluster.fork()
		}

		cluster.on('exit', onExit)
		cluster.on('listening', onListening)
		cluster.on('disconnect', onDisconnect)
	} else {
		// Workers can share any TCP connection
		// In this case it is an HTTP server
		app.listen(app.get('port'), app.get('host'), () => {
			logger.info(`Worker ${process.pid} started`, {
				service: 'cluster',
				method: null,
			})
		})
	}
	return app
}

export default clusterConfig
