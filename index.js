const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const rid = require('connect-rid')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')
const csrf = require('csurf')
const methodOverride = require('method-override')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const helmet = require('helmet')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// compress all responses
app.use(compression())

// app.use(rid())

app.use(express.static(path.join(__dirname, 'client/dist')))

// A favicon is a visual cue that client software
app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))

// app.set('trust proxy', 1)

var expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
// Stores the session data on the client within a cookie
app.use(cookieSession({
  name: 'sessionloop',
  secret: 's3cr3t',
  keys: ['key1', 'key2'],

  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  } 
}))

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser())

// Allows cross-domain communication from the browser
app.use(cors({
  origin: 'http://example.com',
  optionsSuccessStatus: 200 
}))

app.use(csrf({ cookie: true }))

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use(helmet())

// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})

// app.get('*', function (req, res) {
//   // Update views
//   req.session.views = (req.session.views || 0) + 1
//   // Write response
//   res.end(req.session.views + ' views')
// })

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});