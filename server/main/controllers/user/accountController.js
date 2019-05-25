import Boom from '@hapi/boom'
import * as accountService from '@services/user/accountService.js'
import { generatePassword, comparePassword } from '@middlewares/password-config.js'
import { generateToken } from '@middlewares/token-config.js'
import { successPayload } from '@middlewares/payload-config.js'

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
			let statusCode = err.statusCode || 409
			throw Boom.boomify(err, { statusCode: statusCode })
		}
		throw err
	}
}

/**
 * get list account
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	let payload
	accountService
		.getAllAccount()
		.then(result => {
			payload = successPayload(200, 'Load account success', result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
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
		let account = await accountService.getByUsername(req.body.username)
		let isMatch = await comparePassword(req.body.password, account.password)
		if (isMatch) {
			let token = generateToken(account)
			let result = {
				token: token,
			}
			let payload = successPayload(200, 'Login success', result)
			res.status(200).send(payload)
		} else {
			throw Boom.unauthorized('Password not match')
		}
	} catch (err) {
		next(err)
	}
}
/**
 * create account
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return accountService.createAccount(data)
		})
		.then(result => {
			let payload = successPayload(200, `Account ${result.username} has been Created`, result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * update account
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const update = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return accountService.updateAccount(req.params.id, data)
		})
		.then(result => {
			let payload = successPayload(201, `Account ${req.body.username} has been Update`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * delete account
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const remove = (req, res, next) => {
	accountService
		.deleteAccount(req.params.id)
		.then(result => {
			let payload = successPayload(204, `Account ${result.username} has been Remove`, result)
			res.status(204).send(payload)
		})
		.catch(err => next(err))
}
