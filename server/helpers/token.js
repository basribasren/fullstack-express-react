import jwt from 'jsonwebtoken'
import { errorPayload } from '@helpers/payload.js'

/**
 * generate error payload for consistent return
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
const generateError = (err) => {
	let error = {
		output: {
			statusCode: 401,
			payload: {
				message: err.message,
				error: 'Authentication',
				headers: {},
			},
		},
	}
	return errorPayload(error, err.url, err.method)
}

/**
 * generate token with user account
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export const generateToken = user => {
	let token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '30s' })
	return token
}

/**
 * verifiy token by header x-auth-token
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifyToken = (req, res, next) => {
	const token = req.header('x-auth-token')
	if (!token) {
		let payload = generateError({
			message: 'No token, authorization denied',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	}
	try {
		let data = jwt.verify(token, process.env.SECRET)
		req.user = data.user
		next()
	} catch (err) {
		let payload = generateError({
			message: 'Token is not valid',
			url: req.url,
			method: req.method,
		})
		res.status(401).send(payload)
	}
}
