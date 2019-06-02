import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

export const morganLogger = app => {
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
				path.join(__dirname, '..', '/logs/morgan-access.log'), {
					flags: 'a',
				}
			),
		})
	)
}
