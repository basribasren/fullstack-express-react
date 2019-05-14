import * as profileService from '@/main/services/user/profileService.js'

export const generateData = data => {
	//change to promises to use then
	let result
	result = {
		name: data.name,
		website: data.website,
		logo: data.logo,
		cover: data.cover,
		description: data.description,
		features: data.features,
	}
	return result
}

export const fetchAll = (req, res, next) => {
	profileService
		.getAll()
		.then(data => res.json({ data }))
		.catch(err => next(err))
}

export const create = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return profileService.create(req.body.username, data)
		})
		.then(result => {
			res.status(200).json({
				message: `Profile ${result.username} has been Created`,
			})
		})
		.catch(err => {
			next(err)
		})
}

export const update = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return profileService.update(req.params.username, data)
		})
		.then(result => res.json({ result }))
		.catch(err => next(err))
}

export const remove = (req, res, next) => {
	profileService
		.deleteAccount(req.params.username)
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
