const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const handler = require('./server/config/error_handler.js')
const routes = require('./server/main/routes/index.js')

const app = express()
require('dotenv').config()
/**
 * [if in development mode, use logger]
 * @param  {[type]} process.env.APP_ENV [description]
 * @return {[type]}                     [description]
 */
if (process.env.APP_ENV === 'development') {
	require('./server/config/logger_config.js')(app)
	mongoose.set('debug', true)
}
/**
 * connnection to database mongodb using mongoose
 */
require('./server/config/mongoose_config.js')(mongoose)

/**
 * express default configuration
 */
app.use(express.static(path.join(__dirname, 'client/dist')))
app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))
require('./server/config/express_config.js')(app)

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
require('./server/config/error_handler.js')(app)

app.listen(app.get('port'), app.get('host'), () => {
	console.log(`Server started at http://${app.get('host')}:${app.get('port')}/api`)
})
