const express = require('express');
const router = express.Router();
const Promise = require('promise')

const contact = require('../models/usr_contact');

router.get('/contact/:username', (req, res) =>{
	return new Promise((resolve, reject) => {
		profile.findOne({username : req.params.username})
			.then(profile => {
				var contact = contact.findOne({
					id_profile : profile._id
				}).populate({ 
					path: 'id_profile', select: '_id username email' 
				})
				resolve(res.json({ 
					contact: contact
				}))
			})
			.catch(err => {
				reject(res.status(400).json({ 
					message : "Error: Profile error" 
				}))
			})
	})
});

module.exports = router;