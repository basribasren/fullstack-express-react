import Boom from '@hapi/boom'
import { successPayload } from '@middlewares/payload-config.js'
import * as gameService from '@services/game/gameService.js'
import {
	create as createInfo,
	remove as removeInfo,
} from '@services/game/infoService.js'

/**
 * generate data game
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export const generateDataGame = async data => {
	try {
		let game
		game = {
			title: data.title,
			logo_image: data.logo_image,
			cover_image: data.cover_image,
			url: data.url,
		}
		return game
	} catch (err) {
		if (err.statusCode === undefined) {
			let statusCode = err.statusCode || 409
			throw Boom.boomify(err, { statusCode: statusCode })
		}
		throw err
	}
}

/**
 * generate data info
 * @param  {[type]} id   [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const generateDataInfo = async (id, data) => {
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
 * get list game
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const fetchAll = (req, res, next) => {
	gameService
		.getAll()
		.then(result => {
			let payload = successPayload(200, 'Load game success', result)
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
	gameService
		.getById(req.params.id)
		.then(result => {
			let payload = successPayload(200, `Game ${result._id} has been load`, result)
			res.status(200).send(payload)
		})
		.catch(err => next(err))
}

/**
 * create game
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = async (req, res, next) => {
	try {
		// generate data game
		let game = await generateDataGame(req.body)
		// create game
		let gameCreated = await gameService.create(game)
		// generate data info
		let info = await generateDataInfo(gameCreated._id, req.body)
		// create info
		let infoCreated = await createInfo(info)
		// update id_info in game
		let gameUpdated = await gameService.udpateIdInfo(infoCreated.id_game, infoCreated._id)
		// generate payload
		let payload = successPayload(201, `Game ${gameUpdated._id} has been Created`, gameUpdated)
		// return payload
		res.status(201).send(payload)
	} catch (err) {
		next(err)
	}
}

/**
 * update game by params.id
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const update = (req, res, next) => {
	generateDataGame(req.body)
		.then(data => {
			return gameService.update(req.params.id, data)
		})
		.then(result => {
			let payload = successPayload(201, `Game ${result._id} has been Updated`, result)
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
	gameService
		.remove(req.params.id)
		.then(data => {
			return removeInfo(data.id_info)
		})
		.then(result => {
			let payload = successPayload(204, `Profile ${result._id} has been Remove`, result)
			res.status(204).send(payload)
		})
		.catch(err => next(err))
}
