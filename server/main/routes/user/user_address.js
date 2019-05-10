const express = require('express')
const router = express.Router()
const Promise = require('promise')

const address = require('../../models/usr_address')

router.get('/address/:username', (req, res) => {
	return new Promise((resolve, reject) => {
		profile
			.findOne({ username: req.params.username })
			.then(profile => {
				var address = address
					.findOne({
						id_profile: profile._id,
					})
					.populate({
						path: 'id_profile',
						select: '_id username',
					})
				resolve(
					res.json({
						address: address,
					})
				)
			})
			.catch(err => {
				reject(
					res.status(400).json({
						message: `Error: ${err.message}`,
					})
				)
			})
	})
})

module.exports = router
