import * as listService from '@/main/services/game/listService.js'

/**
 * generate data game
 * @param  {[type]} account [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */

export const generateData = (id_profile, data) => {
	let list_game
	list_game = {
		id_profile: id_profile,
		list_game: data,
	}
	return list_game
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
	listService
		.getById(req.params.id)
		.then(data => res.json({ data }))
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
			res.status(200).json({
				message: `list ${result._id} has been Created`,
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
	generateData(req.params.id_profile, req.body)
		.then(data => {
			return listService.update(req.params.id, data)
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
	listService
		.remove(req.params.id)
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
