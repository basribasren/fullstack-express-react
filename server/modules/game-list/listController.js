import Boom from '@hapi/boom'
import * as listService from './listService.js'
import { successPayload } from '@helpers/payload.js'

/**
 * generate data game
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */

export const generateData = async (id_profile, data) => {
	try {
		let list_game
		list_game = {
			id_profile: id_profile,
			list_game: data,
		}
		return list_game
	} catch (err) {
		if (err.statusCode === undefined) {
			let statusCode = err.statusCode || 409
			throw Boom.boomify(err, { statusCode: statusCode })
		}
		throw err
	}
}

/**
 * get list game
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	listService
		.getAll()
		.then(result => {
			let payload = successPayload(200, 'Load list game success', result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * get game by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const getOne = (req, res, next) => {
	listService
		.getById(req.params.id)
		.then(result => {
			let payload = successPayload(200, `List game ${result._id} has been loaded`, result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * create list
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = (req, res, next) => {
	generateData(req.params.id_profile, req.body)
		.then(data => {
			return listService.create(data)
		})
		.then(result => {
			let payload = successPayload(201, `List game ${result._id} has been Created`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * update game by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const update = (req, res, next) => {
	generateData(req.params.id_profile, req.body)
		.then(data => {
			return listService.update(req.params.id, data)
		})
		.then(result => {
			let payload = successPayload(201, `List Game ${result._id} has been Updated`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * delete game by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const remove = (req, res, next) => {
	listService
		.remove(req.params.id)
		.then(result => {
			let payload = successPayload(204, `List Game ${result._id} has been Remove`, result)
			res.status(204).send(payload)
		})
		.catch(err => next(err))
}
