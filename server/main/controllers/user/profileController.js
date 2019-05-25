import Boom from '@hapi/boom'
import { successPayload } from '@middlewares/payload-config.js'
import { getByUsername } from '@services/user/accountService.js'
import * as profileService from '@services/user/profileService.js'

/**
 * generate data profile
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export const generateData = async (account, data) => {
	try {
		let result
		result = {
			id_account: account._id,
			username: account.username,
			email: account.email,
			name: data.name,
			logo_image: data.logo_image,
			cover_image: data.cover_image,
			description: data.description,
			feature: data.feature,
			contacts: data.contacts,
			address: data.address,
			milestones: data.milestones,
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
 * get list profile
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	let payload
	profileService
		.getAll()
		.then(result => {
			payload = successPayload(200, 'Load profile success', result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * get profile by params.username
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const getOne = (req, res, next) => {
	let payload
	profileService
		.getByUsername(req.params.username)
		.then(result => {
			payload = successPayload(200, `Profile ${result.username} has been Load`, result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * create profile
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = (req, res, next) => {
	let payload
	getByUsername(req.body.username)
		.then(account => {
			return generateData(account, req.body)
		})
		.then(data => {
			return profileService.create(data)
		})
		.then(result => {
			payload = successPayload(201, `Profile ${result.username} has been Created`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * update profile by params.username
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const update = (req, res, next) => {
	let payload
	getByUsername(req.params.username)
		.then(account => {
			return generateData(account, req.body)
		})
		.then(data => {
			return profileService.update(req.params.username, data)
		})
		.then(result => {
			payload = successPayload(201, `Profile ${result.username} has been Updated`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * delete profile by params.username
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const remove = (req, res, next) => {
	let payload
	profileService
		.remove(req.params.username)
		.then(result => {
			payload = successPayload(204, `Profile ${result.username} has been Remove`, result)
			res.status(204).send(payload)
		})
		.catch(err => next(err))
}
