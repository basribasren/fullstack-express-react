import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import chalk from 'chalk'
// import configuration
import clusterConfig from '@config/clusterConfig.js'
import { errorHandler } from '@config/errorHandler.js'
import expressConfig from '@config/expressConfig.js'
import loggerConfig from '@config/loggerConfig.js'
import mongooseConfig from '@config/mongooseConfig.js'
import { generatedTransporter } from '@config/nodemailerConfig.js'
import swaggerConfig from '@config/swaggerConfig.js'
// import routes
import routes from '@modules/index.js'

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
	app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')))
}

/**
 * generate setting nodemailer
 * @type {[type]}
 */
let transporter = generatedTransporter()

/**
 * Routes for API documentation
 */
let config = swaggerConfig
app.get('/api/v1/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(config)
})
app.use('/api/v1/docs', express.static('./server/docs/swagger-ui'))

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

/**
 * Server with cluster
 */
// clusterConfig(app)

/**
 * Server without cluster
 * @param  {[type]} app.get('port') [description]
 * @param  {[type]} app.get('host') [description]
 * @param  {[type]} (               [description]
 * @return {[type]}                 [description]
 */
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
