import { errorPayload } from '@helpers/payload.js'

/**
 * generate error payload for consistent return
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
const generateError = (err) => {
	let newError = {
		output: {
			statusCode: 401,
			payload: {
				message: err.message,
				error: 'Authentication',
				headers: {},
			},
		},
	}
	return errorPayload(newError, err.url, err.method)
}

/**
 * verify role
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifyRole = (req, res, next) => {
	const role = req.session.role
	if (!role) {
		let payload = generateError({
			message: 'role not found, authentication denied',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	}
	if (role === 'admin') {
		next()
	} else {
		let payload = generateError({
			message: 'role invalid, authentication denied',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	}
}

/**
 * verify self
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifySelf = (req, res, next) => {
	const id = req.session.id
	if (!id) {
		let payload = generateError({
			message: 'id not found, authentication denied',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	}
	if (req.body.id === req.session.id) {
		next()
	} else {
		let payload = generateError({
			message: 'id invalid, authentication denied',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	}
}
