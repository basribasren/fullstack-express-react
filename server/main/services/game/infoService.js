import Boom from '@hapi/boom'
import infoModel from '@models/game/infoModel.js'
import { isEmpty } from '@middlewares/validation-config.js'

/**
 * get all list info
 * @return {[type]} [description]
 */
export const getAll = () => {
	return infoModel
		.find()
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
 * get info by id
 * @param  {ObjectId} id [description]
 * @return {[type]}    [description]
 */
export const getById = id => {
	return infoModel
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
 * create info
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const create = data => {
	return infoModel
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
 * update info by id
 * @param  {String} id [description]
 * @param  {Object} data     [description]
 * @return {[type]}          [description]
 */
export const update = (id, data) => {
	return infoModel
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
 * delete info by id
 * @param  {String} id [description]
 * @return {[type]}          [description]
 */
export const remove = id => {
	return infoModel
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
	return infoModel.collection
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
