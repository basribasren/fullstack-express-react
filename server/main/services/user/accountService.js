import Boom from '@hapi/boom'
import accountModel from '@models/user/accountModel.js'
import { isEmpty } from '@middlewares/validation-config.js'

/**
 * NOTE
 * chose what data will return in result
 * do not returning password
 */

/**
 * get all list account
 * @return {[type]} [description]
 */
export const getAllAccount = () => {
	return accountModel
		.find()
		.sort({ date_created: -1 })
		.limit(1000)
		.then(result => {
			// result will return all list account
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
 * get account by username
 * @param  {String} username [description]
 * @return {[type]}      [description]
 */
export const getByUsername = username => {
	return accountModel
		.findOne({ username: username })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with username ${username} is Not Found`)
			}
			//result will return all the account data by username
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
 * create account
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const createAccount = data => {
	return accountModel
		.create(data)
		.then(result => {
			//result will return data has been create
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
 * update account by _id
 * @param  {ObjectId} id   [description]
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 * butuh perbaikan
 */
export const updateAccount = (id, data) => {
	let newData = {
		password: data.password,
		role: data.role,
		active: data.active,
	}
	return accountModel
		.findOneAndUpdate({ _id: id }, { $set: newData })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with id ${id} is Not Found`)
			}
			//result will return only set data
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
 * delete account by _id
 * @param  {ObjectId} id [description]
 * @return {[type]}    [description]
 */
export const deleteAccount = id => {
	return accountModel
		.findOneAndDelete({ _id: id })
		.then(result => {
			if (isEmpty(result)) {
				throw Boom.notFound(`Data with id ${id} is Not Found`)
			}
			//result will return all data account by id
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
 * delete collection on database
 * @return {[type]} [description]
 */
export const dropAccount = () => {
	return accountModel.collection
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
