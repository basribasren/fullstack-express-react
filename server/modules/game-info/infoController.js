import Boom from '@hapi/boom'
import * as infoService from './infoService.js'
import { successPayload } from '@helpers/payload.js'

/**
 * generate data info
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */

export const generateData = async (id, data) => {
	try {
		let info
		info = {
			id_game: id,
			description: data.description,
			screenshot: data.screenshot,
			demo: data.demo,
			size: data.size,
		}
		return info
	} catch (err) {
		if (err.statusCode === undefined) {
			let statusCode = err.statusCode || 409
			throw Boom.boomify(err, { statusCode: statusCode })
		}
		throw err
	}
}

/**
 * get list info
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	infoService
		.getAll()
		.then(result => {
			let payload = successPayload(200, 'Load info game success', result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * get info by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const getOne = (req, res, next) => {
	infoService
		.getById(req.params.id)
		.then(result => {
			let payload = successPayload(200, `Info game ${result._id} has been loaded`, result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * create info
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = (req, res, next) => {
	generateData(req.params.id_game, req.body)
		.then(data => {
			return infoService.create(data)
		})
		.then(result => {
			let payload = successPayload(201, `Info game ${result._id} has been Created`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * update info by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const update = (req, res, next) => {
	generateData(req.params.id_game, req.body)
		.then(data => {
			return infoService.update(req.params.id, data)
		})
		.then(result => {
			let payload = successPayload(201, `Info Game ${result._id} has been Updated`, result)
			res.status(201).send(payload)
		})
		.catch(err => next(err))
}

/**
 * delete info by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const remove = (req, res, next) => {
	infoService
		.remove(req.params.id)
		.then(result => {
			let payload = successPayload(204, `Info Game ${result._id} has been Remove`, result)
			res.status(204).send(payload)
		})
		.catch(err => next(err))
}
