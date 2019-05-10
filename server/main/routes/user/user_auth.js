const express = require('express')
const router = express.Router()
const Promise = require('promise')
const bcrypt = require('bcryptjs')

const account = require('../../models/user/usr_account')

/**
 * [sign-in enpoint for user sign-in]
 * @param  {[Endpoint]} '/sign-in' 	[description]
 * @param  {[Object]} 	(req, res)   	[description]
 * @return {[String]} 	req.body.username	[description]
 * @return {[String]} 	req.body.password	[description]
 * @return {[Email]} 	req.body.email	[description]
 * @return {[String]} 	req.body.role	[description]
 */
router.post('/sign-in', (req, res) => {
	return new Promise((resolve, reject) => {
		account
			.findOne({ username: req.body.username })
			.then(account => {
				return bcrypt.compare(req.body.password, account.password)
			})
			.then(isMatch => {
				if (isMatch === true) {
					req.session.account = {
						username: req.body.username,
						email: req.body.email,
					}
					resolve(
						res.json({
							message: 'Hey welcome you verified',
							session: req.session,
						})
					)
				} else {
					reject(
						res.status(400).json({
							message: 'Error: The password not match',
						})
					)
				}
			})
			.catch(err => {
				reject(
					res.status(400).json({
						message: err.message,
					})
				)
			})
	})
})

/**
 * [sign-up endpoint for user to register]
 * @param  {[Endpoint]} '/sign-up' 	[description]
 * @param  {[Object]} (req, res)	[description]
 * @return {[type]}            		[description]
 */
router.post('/sign-up', (req, res) => {
	return new Promise((resolve, reject) => {
		bcrypt
			.genSalt(10)
			.then(salt => {
				return bcrypt.hash(req.body.password, salt)
			})
			.then(hash => {
				let data = {
					username: req.body.username,
					password: hash,
					email: req.body.email,
					role: req.body.role,
					status: req.body.status,
				}
				return account.create(data)
			})
			.then(user => {
				resolve(
					res.status(200).json({
						message: `Account ${user.username} has been Created`,
					})
				)
			})
			.catch(err => {
				reject(
					res.status(400).json({
						message: err.message,
					})
				)
			})
	})
})

/**
 * [sign-out endpoint for user logout]
 * @param  {[type]} '/sign-out' 	[description]
 * @param  {[Object]} (req, res)	[description]
 * @return {[type]}            		[description]
 */
router.get('/sign-out', (req, res) => {
	if (!req.session.account.username) {
		return res.status(405).send({ message: 'Hey Man your not Log-in' })
	} else {
		req.session.destroy()
		return res
			.status(200)
			.send({ message: 'you have been logout... see ya!!' })
	}
})

module.exports = router
