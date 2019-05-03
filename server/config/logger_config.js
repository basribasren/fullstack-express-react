const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

// log only 4xx and 5xx responses to console
module.exports = morgan('dev', {
	skip: function(req, res) {
		return res.statusCode < 400
	},
})

// log all requests to access.log
module.exports = morgan('common', {
	stream: fs.createWriteStream(
		path.join(__dirname, '..', '..', '/access.log'),{
			flags: 'a',
		}
	),
})
