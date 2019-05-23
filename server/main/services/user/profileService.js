import profileModel from '@models/user/profileModel.js'
import { NotFoundPayload } from '@config/errorHandler.js'
/**
 * get all list profile
 * @return {[type]} [description]
 */
export const getAll = () => {
	return profileModel
		.find()
		.sort({ date_created: -1 })
		.limit(1000)
		.then(result => {
			if (result.length === 0) {
				return NotFoundPayload()
			}
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return err
		})
}
