import * as profileService from '@/main/services/user/profileService.js'
import { getByUsername } from '@/main/services/user/accountService.js'

/**
 * generate data profile
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export const generateData = (account, data) => {
	return new Promise(resolve => {
		let result
		result = {
			id_account: account.id,
			username: account.username,
			email: account.email,
			name: data.name,
			logo_image: data.logo_image,
			cover_image: data.cover_image,
			description: data.description,
			features: data.features,
			contacts: data.contacts
		}
		resolve(result)
	})
}

/**
 * get list profile
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	profileService
		.getAll()
		.then(data => res.json({ data }))
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
	profileService
		.getByUsername(req.params.username)
		.then(data => res.json({ data }))
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
	getByUsername(req.body.username)
		.then(account => {
			return generateData(account, req.body)
		})
		.then(data => {
			return profileService.create(data)
		})
		.then(result => {
			res.status(200).json({
				message: `Profile ${result.username} has been Created`,
			})
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
	getByUsername(req.params.username)
		.then(account => {
			return generateData(account, req.body)
		})
		.then(data => {
			return profileService.update(req.params.username, data)
		})
		.then(result => {
			res.status(200).json({ result })
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
	profileService
		.remove(req.params.username)
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
