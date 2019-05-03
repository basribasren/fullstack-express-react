const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const path = require('path')
const favicon = require('serve-favicon')
const cors = require('cors')
const csrf = require('csurf')
const methodOverride = require('method-override')
const helmet = require('helmet')
const serveStatic = require('serve-static')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('./server/config/logger_config.js')
const handler = require('./server/config/error_handler.js')
<<<<<<< HEAD
const routes = require('./server/routes/index.js')

const app = express()
require('dotenv').config()

if (process.env.APP_ENV === 'development') {
	mongoose.set('debug', true)
	app.use(logger)
}
mongoose.connect(process.env.DB_MONGOODB_URI, {
	useNewUrlParser: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30,
=======
const app = express()
require('dotenv').config()

const auth = require('./server/routes/user/user_auth')
const profile = require('./server/routes/user/user_profile')

mongoose.set('debug', true)
mongoose.connect(process.env.DB_MONGOODB_URI, {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
>>>>>>> 022b08f555d7c028586ae0671f33c3b9c993b6c3
})

var connection = mongoose.connection
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', function() {
<<<<<<< HEAD
	console.log('Successfully connected to database')
})

=======
  console.log('Successfully connected to database')
})

app.use(logger)
>>>>>>> 022b08f555d7c028586ae0671f33c3b9c993b6c3
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// compress all responses
app.use(compression())
// set location folder static file
app.use(express.static(path.join(__dirname, 'client/dist')))
// A favicon is a visual cue that client software
app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))

app.use(cookieParser())

<<<<<<< HEAD
// it will incorrectly register the proxy’s IP address as the client IP address unless trust proxy is configured
=======
 // it will incorrectly register the proxy’s IP address as the client IP address unless trust proxy is configured
>>>>>>> 022b08f555d7c028586ae0671f33c3b9c993b6c3
app.set('trust proxy', 1)

const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
app.use(session({
<<<<<<< HEAD
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: expiryDate,
		httpOnly: true,
	},
}))

// Allows cross-domain communication from the browser
app.use(cors())
=======
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { 
      secure: false, 
      maxAge: expiryDate, 
      httpOnly: true 
    }
}))

// Allows cross-domain communication from the browser
app.use(cors({
  origin: 'http://example.com',
  optionsSuccessStatus: 200 
}))
>>>>>>> 022b08f555d7c028586ae0671f33c3b9c993b6c3
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
// Help secure Express apps with various HTTP headers
app.use(helmet())

<<<<<<< HEAD
// API Routes
app.use('/api', routes)

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client/dist/index.html'))
=======
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ]

  res.json(customers)
})

app.use('/api/auth', auth)
app.use('/api/profile', profile)


// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist/index.html"))
>>>>>>> 022b08f555d7c028586ae0671f33c3b9c993b6c3
})

// app.use(handler)

// Set Port
app.set('port', (process.env.PORT || 3000))

<<<<<<< HEAD
app.listen(app.get('port'), app.get('host'), () => {
	console.log(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
})
=======
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'))
})
>>>>>>> 022b08f555d7c028586ae0671f33c3b9c993b6c3
