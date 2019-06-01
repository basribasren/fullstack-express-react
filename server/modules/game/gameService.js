import Boom from '@hapi/boom'
import gameModel from './gameModel.js'
import { isEmpty } from '@helpers/validation.js'

/**
 * get all list game
 * @return {[type]} [description]
 */
export const getAll = () => {
	return gameModel
		.find()
		.then(result => {
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}

/**
 * get game by id
 * @param  {ObjectId} id [description]
 * @return {[type]}    [description]
 */
export const getById = id => {
	return gameModel
		.findOne({ _id: id })
		.populate('Info')
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data game with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}

/**
 * create game
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const create = data => {
	return gameModel
		.create(data)
		.then(result => {
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}

/**
 * update id_info on game
 * @param  {[type]} id [description]
 * @param  {[type]} id_info [description]
 * @return {[type]}         [description]
 */
export const udpateIdInfo = (id, id_info) => {
	return gameModel
		.findOneAndUpdate({ _id: id }, { $set: { id_info: id_info } })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data game with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}

/**
 * update game by id
 * @param  {String} id [description]
 * @param  {Object} data     [description]
 * @return {[type]}          [description]
 */
export const update = (id, data) => {
	return gameModel
		.findOneAndUpdate({ _id: id }, { $set: data })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data game with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}

/**
 * delete game by id
 * @param  {String} id [description]
 * @return {[type]}          [description]
 */
export const remove = id => {
	return gameModel
		.findOneAndDelete({ _id: id })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data game with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}

/**
 * delete the collection on database
 * @return {[type]} [description]
 */
export const trash = () => {
	return gameModel.collection
		.drop()
		.then(() => {
			console.log('drop collection success')
			return
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}
