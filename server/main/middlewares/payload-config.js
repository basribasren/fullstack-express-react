/**
 * generate success payload with more information
 * @param  {[type]} status  [description]
 * @param  {[type]} message [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export const successPayload = (status, message, data) => {
	return {
		data: data,
		status: status,
		message: message,
		type: 'Request Success',
		header: {},
	}
}

/**
 * generate error payload for more information
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
export const errorPayload = err => {
	return {
		data: [],
		status: err.output.statusCode || 500,
		message: err.output.payload.message || 'Something error',
		type: err.output.payload.error || 'Internal Error',
		header: err.output.headers || {},
	}
}
