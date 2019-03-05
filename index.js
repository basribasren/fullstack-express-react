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

const cookie = require('./server/config/cookie_config.js')
const logger = require('./server/config/logger_config.js')
const handler = require('./server/config/error_handler.js')
const app = express()

require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// compress all responses
app.use(compression())
// set location folder static file
app.use(express.static(path.join(__dirname, 'client/dist')))
// A favicon is a visual cue that client software
app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))

app.use(cookie)

 // it will incorrectly register the proxy’s IP address as the client IP address unless trust proxy is configured
app.set('trust proxy', 1)
// Allows cross-domain communication from the browser
app.use(cors({
  origin: 'http://example.com',
  optionsSuccessStatus: 200 
}))
// Node.js CSRF protection middleware
app.use(csrf({ cookie: true }))
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
// Help secure Express apps with various HTTP headers
app.use(helmet())

app.use(logger)

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist/index.html"));
});

app.use(handler)

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});