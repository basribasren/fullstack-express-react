import accountModel from '@/main/models/user/accountModel.js'

/**
 * get all list account
 * @return {[type]} [description]
 */
export const getAllAccount = () => {
	return accountModel
		.find()
		.then(result => {
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
		})
}

/**
 * update account by _id
 * @param  {ObjectId} id   [description]
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export const updateAccount = (id, data) => {
	let newData = {
		password: data.password,
		status: data.status,
	}
	return accountModel
		.findOneAndUpdate({ _id: id }, { $set: newData })
		.then(result => {
			return result
		})
		.catch(err => {
			throw new Error(err)
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
			return result
		})
		.catch(err => {
			throw new Error(err)
		})
}

export const dropAccount = () => {
	return accountModel.collection
		.drop()
		.then(() => {
			console.log('drop collection success')
			return
		})
		.catch(err => {
			return err
		})
}
