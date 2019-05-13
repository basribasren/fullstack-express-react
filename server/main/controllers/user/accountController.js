import bcrypt from 'bcryptjs'

import * as accountService from '@/main/services/user/accountService.js'

export const generatePassword = (password) => {
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
	let data
	generatePassword(req.body.password)
		.then(result => {
			let data = {
				username: req.body.username,
				password: result,
				email: req.body.email,
				role: req.body.role,
				status: req.body.status,
			}
			return data
		})
		.then(data => {
			let result = accountService.createAccount(data)
			return result
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
	accountService
		.updateAccount(req.params.id, req.body)
		.then(data => res.json({ data }))
		.catch(err => next(err))
}

export const remove = (req, res, next) => {
	accountService
		.deleteAccount(req.params.id)
		.then(data => res.status(204).json({ data }))
		.catch(err => next(err))
}
