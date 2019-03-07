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
const cookie = require('./server/config/cookie_config.js')
const logger = require('./server/config/logger_config.js')
const handler = require('./server/config/error_handler.js')
const app = express()
require('dotenv').config()
const auth = require('./server/routes/user/user_auth');
const profile = require('./server/routes/user/user_profile');

mongoose.set('debug', true);
mongoose.connect(process.env.DB_MONGOODB_URI, {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
});

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log('Successfully connected to database');
});

app.use(logger)
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

app.use(cookieParser());

 // it will incorrectly register the proxy’s IP address as the client IP address unless trust proxy is configured
app.set('trust proxy', 1)

const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { 
      secure: false, 
      maxAge: expiryDate, 
      httpOnly: true 
    }
}));

// Allows cross-domain communication from the browser
app.use(cors({
  origin: 'http://example.com',
  optionsSuccessStatus: 200 
}))
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
// Help secure Express apps with various HTTP headers
app.use(helmet())

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.use('/api/auth', auth);
app.use('/api/profile', profile);


// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist/index.html"));
});

// app.use(handler)

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});