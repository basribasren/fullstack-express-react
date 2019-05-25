import Boom from '@hapi/boom'
import profileModel from '@models/user/profileModel.js'
import { isEmpty } from '@middlewares/validation-config.js'

/**
 * get all list profile
 * @return {[type]} [description]
 */
export const getAll = () => {
	return profileModel
		.find()
		.sort({ date_created: -1 })
		.limit(20)
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
 * get random profile
 * @return {[type]} [description]
 */
export const getRandomOne = () => {
	return profileModel
		.find()
		.limit(1)
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
 * get profile by username
 * @param  {String} username [description]
 * @return {[type]}          [description]
 */
export const getByUsername = username => {
	return profileModel
		.findOne({ username: username })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with username ${username} is Not Found`)
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
 * get profile by id
 * @param  {ObjectId} id [description]
 * @return {[type]}    [description]
 */
export const getById = id => {
	return profileModel
		.findOne({ _id: id })
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
 * create profile
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const create = data => {
	return profileModel
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
 * update profile by username
 * @param  {String} username [description]
 * @param  {Object} data     [description]
 * @return {[type]}          [description]
 */
export const update = (username, data) => {
	return profileModel
		.findOneAndUpdate({ username: username }, { $set: data })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data profile with username ${username} is Not Found`)
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
 * delete profile by username
 * @param  {String} username [description]
 * @return {[type]}          [description]
 */
export const remove = username => {
	return profileModel
		.findOneAndDelete({ username: username })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data profile with username ${username} is Not Found`)
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
 * delete collection database
 * @return {[type]} [description]
 */
export const dropProfile = () => {
	return profileModel.collection
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
