import * as infoService from '@/main/services/game/infoService.js'

/**
 * generate data game
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */

export const generateData = (id, data) => {
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
	infoService
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
	infoService
		.getById(req.params.id)
		.then(data => res.json({ data }))
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
			res.status(200).json({
				message: `Info ${result._id} has been Created`,
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
	generateData(req.params.id_game, req.body)
		.then(data => {
			return infoService.update(req.params.id, data)
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
	infoService
		.remove(req.params.id)
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
