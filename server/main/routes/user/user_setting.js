var express = require('express')
var router = express.Router()

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

var authService = require('../../service/user/auth')
var getUser = require('../../service/user/get')
var updateUser = require('../../service/user/update')

/** :USERNAME/SETTING:
 * 		require userService.loginUser(data)
 * 		require req.session.username for control the flow
 *		_GET 	generate csrfProtection token for the page
 *				redirect to Setting page (future)
 *		_POST 	get username and password
 *				create req.session.verification for double security
 *				redirect to GeneralSetting page (future)
 */
router.get('/setting/:username', csrfProtection, function(req, res, next) {
	var username = req.params.username
	if (req.session.username === username) {
		res.send({
			message: 'You Are in Setting Page',
			csrfToken: req.csrfToken(),
			session: req.session,
		})
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

router.post('/setting/:username', function(req, res, next) {
	var data = {
		username: req.params.username,
		password: req.body.password,
	}
	if (req.session.username == data.username) {
		authService.loginUser(data, function(err, isMatch) {
			if (err) {
				return res.send({ message: err.message })
			}
			if (isMatch == true) {
				req.session.verification = data.username
				return res.send({
					message: 'Hey welcome you verified',
					session: req.session,
				})
			} else {
				return res.send({ message: err.message })
			}
		})
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

/** :USERNAME/SETTING/CONTACT:
 * 		require userService.updateContactUser(data)
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and contact
 *		_POST 	get req.body.:contact
 *				redirect to this.page with <message> (future)
 */
router.get('/setting/:username/contact', csrfProtection, function(
	req,
	res,
	next
) {
	var username = req.params.username
	if (req.session.username == username) {
		if (req.session.verification == username) {
			getUser.getSetting(username, function(err, profile, contact) {
				if (err) {
					return res.send({
						message: err.message,
					})
				} else {
					return res.send({
						profile: profile,
						contact: contact,
					})
				}
			})
		} else {
			res.send({
				message: 'You Are not verificated.. sign-in first',
			})
		}
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

router.post('/setting/:username/contact', function(req, res, next) {
	var username = req.params.username
	if (req.session.username == username) {
		if (req.session.verification == username) {
			var data = {
				username: req.params.username,
				phone_number: req.body.phone_number,
				github: req.body.github,
				facebook: req.body.facebook,
				twitter: req.body.twitter,
			}
			updateUser.updateContacts(data, function(err) {
				if (err) {
					return res.send({ message: err.message })
				} else {
					return res.send({ message: 'contact has been updated' })
				}
			})
		} else {
			res.send({ message: 'You Are not verificated.. sign-in first' })
		}
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

/** :USERNAME/SETTING/ADDRESS:
 * 		require userService.updateAddressUser(data)
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_GET 	generate csrfProtection token for the page
 *				get the profile and account
 *		_POST 	get req.body.:address
 *				redirect to this.page with <message> (future)
 */
router.get('/setting/:username/address', csrfProtection, function(
	req,
	res,
	next
) {
	var username = req.params.username
	if (req.session.username == username) {
		if (req.session.verification == username) {
			getUser.getAddress(username, function(err, profile, address) {
				if (err) {
					return res.send({ message: err.message })
				} else {
					return res.send({ profile: profile, address: address })
				}
			})
		} else {
			res.send({ message: 'You Are not verificated.. sign-in first' })
		}
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

router.post('/setting/:username/address', function(req, res, next) {
	var username = req.params.username
	if (req.session.username == username) {
		if (req.session.verification == username) {
			var data = {
				username: req.params.username,
				province: req.body.province,
				city: req.body.city,
				subdistrict1: req.body.subdistrict1,
				subdistrict2: req.body.subdistrict2,
				street: req.body.street,
				postal_code: req.body.postal_code,
			}
			updateUser.updateAddress(data, function(err) {
				if (err) {
					return res.send({ message: err.message })
				} else {
					return res.send({ message: 'address has been updated' })
				}
			})
		} else {
			res.send({ message: 'You Are not verificated.. sign-in first' })
		}
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

/** :USERNAME/SETTING/DELETE:
 * 		require userService.deleteAccountUser(username)
 * 		require req.session.username for control the flow
 * 		require req.session.verification for access setting/:page page
 *		_POST 	will delete the account
 *				redirect to this.page with <message> (future)
 */
router.post('/setting/:username/delete', function(req, res, next) {
	var username = req.params.username
	if (req.session.username == username) {
		if (req.session.verification == username) {
			authService.deleteAccount(username, function(err) {
				if (err) {
					return res.send({ message: err.message })
				} else {
					req.session.destroy()
					return res.send({
						message: 'account has been delete',
						session: req.session,
					})
				}
			})
		} else {
			res.send({ message: 'You Are not verificated.. sign-in first' })
		}
	} else {
		res.status(401).send({
			message: 'You Are not authenticated.. sign-in first',
		})
	}
})

module.exports = router
