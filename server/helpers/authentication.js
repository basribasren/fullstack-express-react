import jwt from 'jsonwebtoken'
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
 * cek is user login or not
 * if user has login, next()
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const isLogin = (req, res, next) => {
	if (!req.session.user) {
		let payload = generateError({
			message: 'not login, cannot access resource',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	} else {
		next()
	}
}

/**
 * cek if user login or not
 * if user not login, next()
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const isNotLogin = (req, res, next) => {
	if (req.session.user) {
		let payload = generateError({
			message: 'not login, cannot access resource',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	} else {
		next()
	}
}
/**
 * cek is user admin or not
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const isAdmin = (req, res, next) => {
	const role = req.session.user.role
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
 * cek user is self or not
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const isSelf = (req, res, next) => {
	const id = req.session.user._id
	if (!id) {
		let payload = generateError({
			message: 'id not found, authentication denied',
			url: req.url,
			method: req.method,
		})
		return res.status(401).send(payload)
	}
	if (req.params.id === id) {
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
 * verifiy token by header x-auth-token or session
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifyToken = (req, res, next) => {
	const token = req.header('x-auth-token') || req.session.token
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
		req.session.user = data.user
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
