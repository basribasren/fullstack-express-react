import Boom from '@hapi/boom'
import gameModel from '@models/game/gameModel.js'

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
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			throw new Error(err)
		})
}

/**
 * update id_info on game
 * @param  {[type]} id_game [description]
 * @param  {[type]} id_info [description]
 * @return {[type]}         [description]
 */
export const udpateIdInfo = (id_game, id_info) => {
	return gameModel
		.findOneAndUpdate({ _id: id_game }, { $set: { id_info: id_info } })
		.then(result => {
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return err
		})
}
