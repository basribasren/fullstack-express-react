const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const methodOverride = require('method-override')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const session = require('express-session')

module.exports = function(app) {
	// parse application/json
	app.use(bodyParser.json())
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	// compress all responses
	app.use(compression())
	// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
	app.use(cookieParser())
	// it will incorrectly register the proxy’s IP address as the client IP address unless trust proxy is configured
	app.set('trust proxy', 1)
	// Create a session middleware with the given options.
	const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
	app.use(
		session({
			secret: 'keyboard cat',
			resave: true,
			saveUninitialized: true,
			cookie: {
				secure: false,
				maxAge: expiryDate,
				httpOnly: true,
			},
		})
	)
	// const whitelist = ['https://apidirectory1.com', 'https://apidirectory2.com']
	// const corsOptionsDelegate = function(req, callback) {
	// 	const corsOptions;
	// 	if (whitelist.indexOf(req.header('Origin')) !== -1) {
	// 		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	// 	} else {
	// 		corsOptions = { origin: false } // disable CORS for this request
	// 	}
	// 	callback(null, corsOptions) // callback expects two parameters: error and options
	// }
	// Allows cross-domain communication from the browser
	app.use(cors())
	// override with the X-HTTP-Method-Override header in the request
	app.use(methodOverride('X-HTTP-Method-Override'))
	// Help secure Express apps with various HTTP headers
	app.use(helmet())
	// Set Port
	app.set('host', process.env.APP_HOST || 'localhost')
	app.set('port', process.env.APP_PORT || 3000)
}
