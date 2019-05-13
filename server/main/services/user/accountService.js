import accountModel from '@/main/models/user/accountModel.js'

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
