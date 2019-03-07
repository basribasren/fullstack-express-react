const express = require('express')
const router = express.Router()
const Promise = require('promise')
const bcrypt 		= require('bcryptjs')

const account 	= require('../../models/usr_account')

/** SIGN_IN:
 *		_POST 	get the username and password
 */
router.post('/sign-in', (req, res) => {
	return new Promise((resolve, reject) => {
		account.findOne({username : req.body.username})
		.then(account => {
			console.log(account)
			return bcrypt.compare(req.body.password, account.password)
		})
		.then(isMatch => {
			if (isMatch === true) {
				req.session.account = {
					username: req.body.username,
					email:req.body.email
				}
				resolve(res.json({ 
					message : 'Hey welcome you verified', 
					session : req.session 
				}))
			} else {
				reject(res.status(400).json({ 
					message : 'Error: The password not match'
				}))	
			}
		})
		.catch(err => {
			reject(res.status(400).json({ 
				message : "Error: Username is not in our database" 
			}))
		})
	})
})

/** SIGN_UP:
 *		_POST 	get the username, password, email, role, status
 */
router.post('/sign-up', (req, res) =>{
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10)
		.then(salt => {
			return bcrypt.hash(req.body.password, salt)
		})
		.then(hash => {
			var data = {
				username: req.body.username,
				password: hash,
				email: req.body.email,
				role: req.body.role,
				status: req.body.status
			}
			return account.create(data)
		})
		.then(user => {
			resolve(res.status(200).json({ 
				message : 'Account has been Created' 
			}))
		})
		.catch(err => {
			reject(res.status(400).json({ 
				message : err.message 
			}))
		})
	})
})

/** SIGN_OUT:
 * 		require req.session.username for control the flow
 *		_GET 	will destroy the session
 *				redirect to sign-in page (future)
 */
router.get('/sign-out', (req, res) =>{
	if (!req.session.account.username) {
		return res.status(405).send({ message : 'Hey Man your not Log-in'})
	}else{
		req.session.destroy()
		return res.status(200).send({message : 'you have been logout... see ya!!'})
	}	
})

module.exports = router
