import Boom from '@hapi/boom'
import { validationResult } from 'express-validator/check'
import { getByUsername } from './userService.js'
import {
	create as createSession,
	remove as removeSession,
} from '@modules/session/sessionService.js'
import { comparePassword } from '@helpers/password.js'
import { generateToken } from '@helpers/token.js'
import { successPayload } from '@helpers/payload.js'

const cekValidation = errors => {
	let listError = []
	errors.array().map(err => {
		listError.push(err.msg)
	})
	let newError = new Error(listError)
	return newError
}
/**
 * login
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const login = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = cekValidation(errors)
			throw Boom.boomify(newError, { statusCode: 422 })
		}
		let account = await getByUsername(req.body.username)
		if (!account) {
			throw Boom.unauthorized('Username not match')
		}
		let isMatch = await comparePassword(req.body.password, account.password)
		if (isMatch) {
			let token = generateToken(account)
			let session = await createSession({ token: token })
			let result = {
				session: session,
				account: account,
			}
			let payload = successPayload(200, 'Login success', result, req.url, req.method)
			res.status(200).send(payload)
		} else {
			throw Boom.unauthorized('Password not match')
		}
	} catch (err) {
		next(err)
	}
}

/**
 * logout
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const logout = async (req, res, next) => {
	try {
		let token = req.header('x-auth-token')
		let result = await removeSession(token)
		let payload = successPayload(200, 'Logout success', result, req.url, req.method)
		res.status(200).send(payload)
	} catch (err) {
		next(err)
	}
}
