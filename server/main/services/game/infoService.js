import infoModel from '@/main/models/game/infoModel.js'

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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
		})
}
