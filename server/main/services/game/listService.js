import listModel from '@/main/models/game/listModel.js'

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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
		})
}

export const trash = () => {
	return listModel.collection
		.drop()
		.then(() => {
			console.log('drop collection success')
			return
		})
		.catch(err => {
			return err
		})
}
