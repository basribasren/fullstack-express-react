import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

/**
 * generate success payload & log it with more information
 * @param  {[type]} status  [description]
 * @param  {[type]} message [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export const successPayload = (status, message, data, service, method) => {
	logger.info(message, { service: service, method: method })
	let payload = {
		data: data,
		status: status,
		message: message,
		type: 'Request Success',
		header: {},
	}
	return payload
}

/**
 * generate error payload & log it with more information
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
export const errorPayload = (err, url, method) => {
	console.log(err)
	logger.error(err.output.payload.message, { service: url, method: method })
	let payload = {
		data: [],
		status: err.output.statusCode || 500,
		message: err.output.payload.message || 'Something error',
		type: err.output.payload.error || 'Internal Error',
		header: err.output.headers || {},
	}
	return payload
}
