import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import mongoose from 'mongoose'
// import cluster from 'cluster'
import dotenv from 'dotenv'

import mongoose_setting from '@/config/mongoose_config.js'
import logger_config from '@/config/logger_config.js'
import express_config from '@/config/express_config.js'
import error_handler from '@/config/error_handler.js'

import routes from '@/main/routes/index.js'

// const numCPUs = require('os').cpus().length
const app = express()

dotenv.config()
/**
 * [if in development mode, use logger]
 * @param  {[type]} process.env.APP_ENV [description]
 * @return {[type]}                     [description]
 */
if (process.env.APP_ENV === 'development') {
	logger_config(app)
	mongoose.set('debug', true)
}

/**
 * connnection to database mongodb using mongoose
 */
mongoose_setting(mongoose)

/**
 * express default configuration
 */
app.use(express.static(path.join(__dirname, 'client/dist')))
if (process.env.APP_ENV === 'production') {
	app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))
}
express_config(app)

/**
 * routes API
 */
app.use('/api', routes)

/**
 * send the user to index html page inspite of the url
 */
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client/dist/index.html'))
})

/**
 * the default error handler, at the last
 */
error_handler(app)

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
	console.log(`Server started at http://${app.get('host')}:${app.get('port')}/api`)
})
// 	console.log(`Worker ${process.pid} started`)
// }
