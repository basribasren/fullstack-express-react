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

export const errorHandler = app => {
	app.use(function(err, req, res, next) {
		if (err.code !== 'EBADCSRFTOKEN') return next(err)

		// handle CSRF token errors here
		res.status(403)
		res.send('form tampered with')
	})
	app.use(function(req, res, next) {
		var err = new Error('Not Found')
		err.status = 404
		next(err)
	})
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get('env') === 'development' ? err : {}

		res.status(err.output.statusCode).json(err.output)
	})
}

/**
 * 
	[100, 'Continue'],
	[101, 'Switching Protocols'],
	[102, 'Processing'],
	[200, 'OK'],
	[201, 'Created'],
	[202, 'Accepted'],
	[203, 'Non-Authoritative Information'],
	[204, 'No Content'],
	[205, 'Reset Content'],
	[206, 'Partial Content'],
	[207, 'Multi-Status'],
	[300, 'Multiple Choices'],
	[301, 'Moved Permanently'],
	[302, 'Moved Temporarily'],
	[303, 'See Other'],
	[304, 'Not Modified'],
	[305, 'Use Proxy'],
	[307, 'Temporary Redirect'],
	[400, 'Bad Request'],
	[401, 'Unauthorized'],
	[402, 'Payment Required'],
	[403, 'Forbidden'],
	[404, 'Not Found'],
	[405, 'Method Not Allowed'],
	[406, 'Not Acceptable'],
	[407, 'Proxy Authentication Required'],
	[408, 'Request Time-out'],
	[409, 'Conflict'],
	[410, 'Gone'],
	[411, 'Length Required'],
	[412, 'Precondition Failed'],
	[413, 'Request Entity Too Large'],
	[414, 'Request-URI Too Large'],
	[415, 'Unsupported Media Type'],
	[416, 'Requested Range Not Satisfiable'],
	[417, 'Expectation Failed'],
	[418, 'I\'m a teapot'],
	[422, 'Unprocessable Entity'],
	[423, 'Locked'],
	[424, 'Failed Dependency'],
	[425, 'Unordered Collection'],
	[426, 'Upgrade Required'],
	[428, 'Precondition Required'],
	[429, 'Too Many Requests'],
	[431, 'Request Header Fields Too Large'],
	[451, 'Unavailable For Legal Reasons'],
	[500, 'Internal Server Error'],
	[501, 'Not Implemented'],
	[502, 'Bad Gateway'],
	[503, 'Service Unavailable'],
	[504, 'Gateway Time-out'],
	[505, 'HTTP Version Not Supported'],
	[506, 'Variant Also Negotiates'],
	[507, 'Insufficient Storage'],
	[509, 'Bandwidth Limit Exceeded'],
	[510, 'Not Extended'],
	[511, 'Network Authentication Required']
 */
