import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import mongoose from 'mongoose'
// import cluster from 'cluster'
import dotenv from 'dotenv'
import chalk from 'chalk'
// import configuration
import mongooseConfig from '@config/mongooseConfig.js'
import loggerConfig from '@config/loggerConfig.js'
import expressConfig from '@config/expressConfig.js'
import { errorHandler } from '@config/errorHandler.js'
import swaggerConfig from '@config/swaggerConfig.js'

// import routes
import routes from '@routes/index.js'

// const numCPUs = require('os').cpus().length
const app = express()

dotenv.config()
/**
 * [if in development mode, use logger]
 * @param  {[type]} process.env.APP_ENV [description]
 * @return {[type]}                     [description]
 */
if (process.env.APP_ENV === 'development') {
	loggerConfig(app)
}

/**
 * connnection to database mongodb using mongoose
 */
mongooseConfig(mongoose)

/**
 * express default configuration
 */
expressConfig(app)

/**
 * Setting the app static folder
 */
app.use(express.static(path.join(__dirname, 'client/dist')))
if (process.env.APP_ENV === 'production') {
	console.log('set faviceon')
	app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')))
}

/**
 * Routes for API documentation
 */
let config = swaggerConfig
app.get('/api/v1/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(config)
})
app.use('/api/v1/docs', express.static('./server/docs'))

/**
 * routes API
 */
app.use('/api', routes)
/**
 * send the user to index html page inspite of the url
 */
if (process.env.APP_ENV === 'production') {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client/dist/index.html'))
	})
}

/**
 * the default error handler, at the last
 */
errorHandler(app)

// if (cluster.isMaster) {
// 	console.log(`Master ${process.pid} is running`)
// 	// Fork workers.
// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.fork()
// 	}

// 	cluster.on('exit', (worker, code, signal) => {
// 		console.log(`worker ${worker.process.pid} died`)
// 	})
// } else {
app.listen(app.get('port'), app.get('host'), () => {
	console.log('--')
	console.log(chalk.green(process.env.APP_NAME))
	console.log(chalk.blue('Environment:\t') + chalk.green(process.env.APP_ENV))
	console.log(chalk.blue('Port:\t\t') + chalk.green(process.env.APP_PORT))
	console.log(chalk.blue('Database:\t') + chalk.green(process.env.DB_MONGOODB_URI))
	console.log(chalk.blue('App version:\t') + chalk.green(process.env.APP_VERSION))
	console.log(chalk.blue('Running at:\t') + chalk.green(`http://${app.get('host')}:${app.get('port')}/api`))
	console.log('--')
})
// 	console.log(`Worker ${process.pid} started`)
// }
