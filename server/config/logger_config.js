import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const logger_config = app => {
	// log only 4xx and 5xx responses to console
	app.use(
		morgan('dev', {
			skip: function(req, res) {
				return res.statusCode < 400
			},
		})
	)
	// log all requests to access.log
	app.use(
		morgan('common', {
			stream: fs.createWriteStream(
				path.join(__dirname, '..', '/log/access.log'), {
					flags: 'a',
				}
			),
		})
	)
}

export default logger_config
