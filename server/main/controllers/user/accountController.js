import bcrypt from 'bcryptjs'

import * as accountService from '@/main/services/user/accountService.js'

export const generatePassword = password => {
	let hash = bcrypt
		.genSalt(10)
		.then(salt => {
			return bcrypt.hash(password, salt)
		})
		.catch(err => {
			return err
		})
	return hash
}

export const generateData = data => {
	let result = generatePassword(data.password)
		.then(hash => {
			result = {
				username: data.username,
				password: hash,
				email: data.email,
				role: data.role,
				status: data.status,
			}
			return result
		})
		.catch(err => {
			return err
		})
	return result
}

export const fetchAll = (req, res, next) => {
	accountService
		.getAllAccount()
		.then(data => res.json({ data }))
		.catch(err => next(err))
}

export const login = (req, res, next) => {
	accountService
		.getByUsername(req.body.username)
		.then(data => {
			return bcrypt.compare(req.body.password, data.password)
		})
		.then(isMatch => {
			if (isMatch === true) {
				req.session.account = {
					username: req.body.username,
					email: req.body.email,
				}
				res.json({
					message: 'Hey welcome you verified',
					session: req.session,
				})
			} else {
				res.status(400).json({
					message: 'Error: The password not match',
				})
			}
		})
		.catch(err => next(err))
}

export const create = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return accountService.createAccount(data)
		})
		.then(result => {
			res.status(200).json({
				message: `Account ${result.username} has been Created`,
			})
		})
		.catch(err => {
			next(err)
		})
}

export const update = (req, res, next) => {
	generateData(req.body)
		.then(data => {
			return accountService.updateAccount(req.params.id, data)
		})
		.then(result => res.json({ result }))
		.catch(err => next(err))
}

export const remove = (req, res, next) => {
	accountService
		.deleteAccount(req.params.id)
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
