import Boom from '@hapi/boom'
import userModel from './userModel.js'
import { isEmpty } from '@helpers/validation.js'

/**
 * NOTE
 * chose what data will return in result
 * do not returning password
 */

/**
 * get all list User
 * @return {[type]} [description]
 */
export const getAllUser = () => {
	return userModel
		.find()
		.sort({ date_created: -1 })
		.limit(1000)
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
 * get User by username
 * @param  {String} username [description]
 * @return {[type]}      [description]
 */
export const getByUsername = username => {
	return userModel
		.findOne({ username: username })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data user with username ${username} is Not Found`)
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
 * create User
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const createUser = data => {
	return userModel
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
 * update User by _id
 * @param  {ObjectId} id   [description]
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 * butuh perbaikan
 */
export const updateUser = (id, data) => {
	let newData = {
		password: data.password,
		role: data.role,
		active: data.active,
	}
	return userModel
		.findOneAndUpdate({ _id: id }, { $set: newData })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data user with id ${id} is Not Found`)
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
 * delete User by _id
 * @param  {ObjectId} id [description]
 * @return {[type]}    [description]
 */
export const deleteUser = id => {
	return userModel
		.findOneAndDelete({ _id: id })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data user with id ${id} is Not Found`)
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
 * delete collection on database
 * @return {[type]} [description]
 */
export const dropUser = () => {
	return userModel.collection
		.drop()
		.then(() => {
			console.log('drop collection user success')
			return
		})
		.catch(err => {
			if (err.statusCode === undefined) {
				throw Boom.boomify(err, { statusCode: 409 })
			}
			throw err
		})
}
