import jwt from 'jsonwebtoken'
import { errorPayload } from '@middlewares/payload-config.js'

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
		let payload = generateError('No token, authorization denied')
		return res.status(401).send(payload)
	}
	try {
		let data = jwt.verify(token, process.env.SECRET)
		req.user = data.user
		next()
	} catch (err) {
		let payload = generateError('Token is not valid')
		res.status(401).send(payload)
	}
}
