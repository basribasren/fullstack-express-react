var cors = require('cors')
var whitelist = ['https://apidirectory1.com', 'https://apidirectory2.com']
var corsOptions = {
	origin: function(origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) != -1
		callback(
			originIsWhitelisted ? null : 'bad request', 
			originIsWhitelisted
		)
	},
}

module.exports = corsOptions
