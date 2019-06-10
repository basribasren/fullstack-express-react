import Boom from '@hapi/boom'
import { validationResult } from 'express-validator/check'
import { getByUsername, createUser } from './userService.js'
import { generateData } from './userController.js'

import { comparePassword } from '@helpers/password.js'
import { generateToken } from '@helpers/authentication.js'
import { successPayload } from '@helpers/payload.js'
import { takeOurError } from '@helpers/validation.js'

/**
 * REGISTER - SKENARIO
 * @skenario 1 - cek chain validation result
 * @skenario 2 - generate data that will save
 * @skenario 3 - save user
 * #skenario 4 - send email in here is bad practice
 * so i think to seperate this function
 */
export const register = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = await takeOurError(errors)
			throw Boom.boomify(new Error(newError), { statusCode: 422 })
		}
		let data = await generateData(req.body)
		let user = await createUser(data)

		let payload = successPayload(200, `User ${user.username} has been Created`, user, req.url, req.method)
		res.status(200).send(payload)
	} catch (err) {
		next(err)
	}
}

/**
 * LOGIN - SKENARIO
 * @skenario 1 - cek chain validation result
 * @skenario 2 - get user by username
 * @skenario 3 - comparing password
 * @skenario 4 - generate token using jwt
 * @skenario 5 - set session
 * @skenario 6 - generate and return payload
 */
export const login = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = await takeOurError(errors)
			throw Boom.boomify(new Error(newError), { statusCode: 422 })
		}
		let account = await getByUsername(req.body.username)
		if (!account) {
			throw Boom.unauthorized('Username not match')
		}
		let isMatch = await comparePassword(req.body.password, account.password)
		if (isMatch) {
			let token = generateToken(account)
			req.session.token = token
			req.session.user = account
			let payload = successPayload(200, 'Login success', token, req.url, req.method)
			res.status(200).send(payload)
		} else {
			throw Boom.unauthorized('Password not match')
		}
	} catch (err) {
		next(err)
	}
}

/**
 * LOGOUT - SKENARION
 * @skenario 1 - cek chain validation result
 * @skenario 2 - get token from session
 * @skenario 4 - destroy session
 * issue - when set wrong token, log out still success
 */
export const logout = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = await takeOurError(errors)
			throw Boom.boomify(new Error(newError), { statusCode: 422 })
		}
		let token = req.header('x-auth-token') || req.session.token
		req.session.destroy()
		let payload = successPayload(200, 'Logout success', token, req.url, req.method)
		res.status(200).send(payload)
	} catch (err) {
		next(err)
	}
}
