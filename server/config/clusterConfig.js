import chalk from 'chalk'
import cluster from 'cluster'
const numCPUs = require('os').cpus().length

const onExit = (worker, code, signal) => {
	if (signal) {
		console.info(chalk.blue('Cluster: ') + chalk.red(`worker #${worker.id} was killed by signal: ${signal}`))
	} else if (code !== 0) {
		console.info(chalk.blue('Cluster: ') + chalk.red(`worker #${worker.id} exited with error code: ${code}`))
	} else {
		console.info(chalk.blue('Cluster: ') + chalk.green(`worker #${worker.id} has died`))
	}
}

const onListening = (worker, address) => {
	// console.log(address)
	console.log(chalk.blue('Cluster: ') + chalk.green(`worker #${worker.id} listening on ${address.address}:${address.port}`))
}

const onDisconnect = (worker) => {
	console.log(chalk.blue('Cluster: ') + chalk.red(`worker #${worker.id} has disconnect`))
}

const clusterConfig = app => {
	if (cluster.isMaster) {
		console.log(`Master ${process.pid} is running`)

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
			console.log(`Worker ${process.pid} started`)
		})
	}
	return app
}

export default clusterConfig
