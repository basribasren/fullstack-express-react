import Boom from '@hapi/boom'
import listModel from '@models/game/listModel.js'
import { isEmpty } from '@middlewares/validation-config.js'

/**
 * get all list game
 * @return {[type]} [description]
 */
export const getAll = () => {
	return listModel
		.find()
		.populate('Game')
		.then(result => {
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				let statusCode = err.statusCode || 409
				throw Boom.boomify(err, { statusCode: statusCode })
			}
			throw err
		})
}

/**
 * get list game by id
 * @param  {ObjectId} id [description]
 * @return {[type]}    [description]
 */
export const getById = id => {
	return listModel
		.findOne({ _id: id })
		.populate('Game')
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				let statusCode = err.statusCode || 409
				throw Boom.boomify(err, { statusCode: statusCode })
			}
			throw err
		})
}

/**
 * create list game
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const create = data => {
	return listModel
		.create(data)
		.then(result => {
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				let statusCode = err.statusCode || 409
				throw Boom.boomify(err, { statusCode: statusCode })
			}
			throw err
		})
}

/**
 * update list game by id
 * @param  {String} id [description]
 * @param  {Object} data     [description]
 * @return {[type]}          [description]
 */
export const update = (id, data) => {
	return listModel
		.findOneAndUpdate({ _id: id }, { $set: data })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				let statusCode = err.statusCode || 409
				throw Boom.boomify(err, { statusCode: statusCode })
			}
			throw err
		})
}

/**
 * delete list game by id
 * @param  {String} id [description]
 * @return {[type]}          [description]
 */
export const remove = id => {
	return listModel
		.findOneAndDelete({ _id: id })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with id ${id} is Not Found`)
			}
			return result
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				let statusCode = err.statusCode || 409
				throw Boom.boomify(err, { statusCode: statusCode })
			}
			throw err
		})
}

/**
 * delete the collection on database
 * @return {[type]} [description]
 */
export const trash = () => {
	return listModel.collection
		.drop()
		.then(() => {
			console.log('drop collection success')
			return
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				let statusCode = err.statusCode || 409
				throw Boom.boomify(err, { statusCode: statusCode })
			}
			throw err
		})
}
