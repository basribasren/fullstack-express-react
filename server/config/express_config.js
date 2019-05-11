import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import methodOverride from 'method-override'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const express_config = app => {
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

export default express_config
