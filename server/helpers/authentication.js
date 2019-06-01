import { errorPayload } from '@helpers/payload.js'

/**
 * generate error payload for consistent return
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
const generateError = (message) => {
	return errorPayload({
		output: {
			statusCode: 401,
			payload: {
				message: message,
				error: 'Authentication',
				headers: {},
			},
		},
	})
}

/**
 * verify role
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifyRole = async (req, res, next) => {
	const role = req.session.role
	if (!role) {
		let payload = generateError('No role, authorization denied')
		return res.status(401).send(payload)
	}
	try {
		if (role === 'admin') {
			next()
		} else {
			let payload = generateError('Authorization denied')
			return res.status(401).send(payload)
		}
	} catch (err) {
		let payload = generateError('Role is not valid')
		res.status(401).send(payload)
	}
}

/**
 * verify self
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifySelf = async (req, res, next) => {
	const id = req.session.id
	if (!id) {
		let payload = generateError('Authorization denied')
		return res.status(401).send(payload)
	}
	try {
		if (req.body.id === req.session.id) {
			next()
		} else {
			let payload = generateError('Authorization denied')
			res.status(401).send(payload)
		}
	} catch (err) {
		let payload = generateError('Authorization denied')
		res.status(401).send(payload)

	}
}
