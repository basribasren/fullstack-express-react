import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import serveStatic from 'serve-static'
import dotenv from 'dotenv'

// import clusterConfig from '@config/cluster.config.js'
import { errorHandler } from '@config/errorHandler.js'
import expressConfig from '@config/express.config.js'
import mongooseConfig from '@config/mongoose.config.js'
// import { morganLogger } from '@config/morgan.config.js'
import { generatedTransporter } from '@config/nodemailer.config.js'
import redisConfig from '@config/redis.config.js'
import sessionConfig from '@config/session.config.js'
import generateSwagger from '@config/swagger.config.js'
import winstonLogger from '@config/winston.config.js'

import routes from '@modules/index.js'

const app = express()

/**
 *  ******************************************************************
 *  load environment configuration from .env
 *  ******************************************************************
 */
dotenv.config()

/**
 *  ******************************************************************
 *  set variabel
 *  ******************************************************************
 */
const STATIC_FOLDER = 'client/dist'
const STATIC_SWAGGER = 'server/docs/swagger-ui'
const STATIC_CALLBACK = 'client/dist/index.html'

/**
 *  ******************************************************************
 *  use winston logger
 *  ******************************************************************
 */
const logger = winstonLogger

/**
 *  ******************************************************************
 *  use morgan logger
 *  ******************************************************************
 */
// morganLogger(app)

/**
 *  ******************************************************************
 *  connnection to database mongodb using mongoose
 *  ******************************************************************
 */
let mongooseConnection = mongooseConfig(app)

/**
 *  ******************************************************************
 *  connnection to redis
 *  ******************************************************************
 */
let redisConnection = redisConfig()

/**
 *  ******************************************************************
 *  express default configuration
 *  ******************************************************************
 */
expressConfig(app)

/**
 *  ******************************************************************
 *  session default configuration
 *  -
 *  ******************************************************************
 */
const SESS_DRIVER = 'redis'
sessionConfig(app, SESS_DRIVER)

/**
 *  ******************************************************************
 *  static folder for client
 *  ******************************************************************
 */
app.get('/robots.txt', (req, res) => {
	res.type('text/plain')
	res.send("User-agent: *\nDisallow: /")
})
app.use(serveStatic(path.resolve(__dirname, STATIC_FOLDER), { 'index': ['index.html', 'index.htm'], }))
if (process.env.APP_ENV === 'production') {
	app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))
}

/**
 *  ******************************************************************
 *  generate and verify nodemailer transporter
 *  ******************************************************************
 */
const transporter = generatedTransporter()

/**
 *  ******************************************************************
 *  generate configuration and routes for API documentation
 *  ******************************************************************
 */
const config = generateSwagger()
app.get('/api/v1/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(config)
})
app.use('/api/v1/docs', serveStatic(path.resolve(__dirname, STATIC_SWAGGER)))

/**
 *  ******************************************************************
 *  routes for all api endpoint
 *  ******************************************************************
 */
app.use('/api', routes)

/**
 *  ******************************************************************
 *  send the user to index html page inspite of the url
 *  ******************************************************************
 */
if (process.env.APP_ENV === 'production') {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, STATIC_CALLBACK))
	})
}

/**
 *  ******************************************************************
 *  the default error handler, at the last
 *  ******************************************************************
 */
errorHandler(app)

/**
 *  ******************************************************************
 *  server with cluster configuration
 *  ******************************************************************
 */
// clusterConfig(app)

/**
 *  ******************************************************************
 *  server without cluster configuration
 *  ******************************************************************
 */
app.listen(app.get('port'), app.get('host'), () => {
	logger.info(`running at: http://${app.get('host')}:${app.get('port')}/api`, {
		service: 'server',
		method: null,
	})
})
