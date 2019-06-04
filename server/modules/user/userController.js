import Boom from '@hapi/boom'
import * as userService from './userService.js'
import { generatePassword } from '@helpers/password.js'
import { successPayload } from '@helpers/payload.js'

/**
 * generate data
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const generateData = async data => {
	try {
		let hash = await generatePassword(data.password)
		let result = {
			username: data.username,
			password: hash,
			email: data.email,
			role: data.role,
			active: data.active,
		}
		return result
	} catch (err) {
		if (err.statusCode === undefined) {
			throw Boom.boomify(err, { statusCode: 409 })
		}
		throw err
	}
}

/**
 * get list User
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	userService
		.getAllUser()
		.then(result => {
			let payload = successPayload(200, 'Load User success', result, req.url, req.method)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * get user by username
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const getByUsername = (req, res, next) => {
	userService
		.getByUsername(req.body.username)
		.then(result => {
			let payload = successPayload(200, `User ${result.username} has been Loaded`, result, req.url, req.method)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * create User
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return userService.createUser(data)
		})
		.then(result => {
			let payload = successPayload(200, `User ${result.username} has been Created`, result, req.url, req.method)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * update User
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const update = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return userService.updateUser(req.params.id, data)
		})
		.then(result => {
			let payload = successPayload(201, `User ${req.body.username} has been Update`, result, req.url, req.method)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * delete User
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const remove = (req, res, next) => {
	userService
		.deleteUser(req.params.id)
		.then(result => {
			let payload = successPayload(204, `User ${result.username} has been Remove`, result, req.url, req.method)
			res.status(204).send(payload)
		})
		.catch(err => next(err))
}
