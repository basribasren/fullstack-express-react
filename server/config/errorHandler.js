import Boom from '@hapi/boom'
import { errorPayload } from '@middlewares/payload-config.js'

/**
 * Use HTTP status codes
 *
 * The HTTP standard provides over 70 status codes to describe the return values. We don’t need them all, but  there should be used at least a mount of 10.
 *
 * 200 – OK – Eyerything is working
 * 201 – OK – New resource has been created
 * 204 – OK – The resource was successfully deleted
 *
 * 304 – Not Modified – The client can use cached data
 *
 * 400 – Bad Request – The request was invalid or cannot be served.
 * 401 – Unauthorized – The request requires an user authentication
 * 403 – Forbidden – The server understood the request, but is refusing it or the access is not allowed.
 * 404 – Not found – There is no resource behind the URI.
 * 422 – Unprocessable Entity – Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
 *
 * 500 – Internal Server Error – API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.
 *
 */

/**
BOOM OUTPUT
{
	output: {
		statusCode: 404,
		payload: {
			statusCode: 404,
			error: 'Not Found',
			message: 'Data with username galih_astuti1 is Not Found'
		},
		headers: {}
	},
}
*/

export const errorHandler = app => {
	app.use(function(err, req, res, next) {
		if (err.code !== 'EBADCSRFTOKEN') return next(err)

		// handle CSRF token errors here
		res.status(403)
		res.send('form tampered with')
	})
	app.use(function(req, res, next) {
		let err = Boom.notFound('Request not Found')
		// let err = new Error('Request not Found')
		next(err)
	})
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get('env') === 'development' ? err : {}

		let payload = errorPayload(err)
		res.status(err.output.statusCode).json(payload)
	})
}
