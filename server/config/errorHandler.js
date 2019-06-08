import Boom from '@hapi/boom'
import { errorPayload } from '@helpers/payload.js'

export const errorHandler = app => {
	/**
	 * error handler when url not found
	 * @skenario 1 - generate error with boom npm
	 * @skenario 2 - passing the error in next()
	 * @param  {[type]} res   [description]
	 */
	app.use(function(req, res, next) {
		let err = Boom.notFound('Request not Found')
		next(err)
	})
	/**
	 * error handler for all request error
	 * @skenario 1 - generate error payload
	 * @skenario 2 - log the error
	 * @skenario 3 - send the payload
	 * @param  {[type]} req   [description]
	 */
	app.use(function(err, req, res, next) {
		let payload = errorPayload(err, req.url, req.method)
		res.status(err.output.statusCode).json(payload)
	})
}
