import * as accountService from '@/main/services/user/accountService.js'
import { generatePassword, comparePassword } from '@/main/middlewares/password-config.js'
import { generateToken } from '@/main/middlewares/token-config.js'

/**
 * generate data
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const generateData = data => {
	let result = generatePassword(data.password)
		.then(hash => {
			result = {
				username: data.username,
				password: hash,
				email: data.email,
				role: data.role,
			}
			return result
		})
		.catch(err => {
			return err
		})
	return result
}

/**
 * get list account
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	accountService
		.getAllAccount()
		.then(data => res.json({ data }))
		.catch(err => next(err))
}

/**
 * login
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const login = (req, res, next) => {
	accountService
		.getByUsername(req.body.username)
		.then(data => {
			let isMatch = comparePassword(req.body.password, data.password)
			if (isMatch) {
				let token = generateToken(data)
				res.status(200).json({ data: data, token: token })
			} else {
				res.status(400).json({
					message: 'Password not match',
				})
			}
		})
		.catch(err => next(err))
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
			res.status(200).json({
				message: `Account ${result.username} has been Created`,
			})
		})
		.catch(err => {
			next(err)
		})
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
		.then(result => res.json({ result }))
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
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
