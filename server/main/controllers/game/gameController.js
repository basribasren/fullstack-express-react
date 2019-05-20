import * as gameService from '@/main/services/game/gameService.js'
import {
	create as createInfo,
	remove as removeInfo,
} from '@/main/services/game/infoService.js'

/**
 * generate data game
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export const generateDataGame = data => {
	return new Promise(resolve => {
		let game
		game = {
			title: data.title,
			logo_image: data.logo_image,
			cover_image: data.cover_image,
			url: data.url,
		}
		resolve(game)
	})
}

export const generateDataInfo = (id, data) => {
	let info
	info = {
		id_game: id,
		description: data.description,
		screenshot: data.screenshot,
		demo: data.demo,
		size: data.size,
	}
	return info
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
		.then(data => res.json({ data }))
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
		.then(data => res.json({ data }))
		.catch(err => next(err))
}

/**
 * create game
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const create = (req, res, next) => {
	generateDataGame(req.body)
		.then(game => {
			// create game
			let data = gameService.create(game)
			return data
		})
		.then(data => {
			// create info
			let info = generateDataInfo(data._id, req.body)
			return createInfo(info)
		})
		.then(info => {
			// update id_info in game
			return gameService.udpateIdInfo(info.id_game, info._id)
		})
		.then(result => {
			res.status(200).json({
				message: `game ${result.title} has been Created`,
			})
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
	generateDataGame(req.body)
		.then(data => {
			return gameService.update(req.params.id, data)
		})
		.then(result => {
			res.status(200).json({ result })
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
		.then(result => {
			// cek this result okeyyy
			console.log(result.id_info)
			//remove info
			return removeInfo(result.id_info)
		})
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
