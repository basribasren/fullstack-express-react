const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

var expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

// Stores the session data on the client within a cookie
module.exports = cookieSession({
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
})

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
module.exports = cookieParser()

