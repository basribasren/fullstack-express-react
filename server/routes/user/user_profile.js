var express = require('express');
var router = express.Router();
const Promise = require('promise')

var profile = require('../../models/usr_profile');

router.post('/', (req, res) =>{
	var data = {
		username 		: req.body.username,
		email 			: req.body.email,
		full_name 		: req.body.full_name,
		profile_picture	: req.body.profile_picture,
		cover_picture	: req.body.cover_picture,
		about 			: req.body.about
	};
	return new Promise((resolve, reject) => {
		profile.create(data)
			.then(profile => {
				resolve(res.json({ profile: profile }))
			})
			.catch(err => {
				reject(res.status(400).json({ 
					message : "Error: Create profile error" 
				}))
			})
	})
});

router.get('/:username', (req, res) =>{
	return new Promise((resolve, reject) => {
		profile.findOne({username : req.params.username})
			.then(profile => {
				resolve(res.json({ profile: profile }))
			})
			.catch(err => {
				reject(res.status(400).json({ 
					message : "Error: Profile not found" 
				}))
			})
	})
});

router.put('/:username', (req, res) => {
	return new Promise((resolve, reject) => {
		profile.findOneAndUpdate({username: req.params.username}, { $set: {
				username 		: req.params.username,
				email 			: req.body.email,
				full_name 		: req.body.full_name,
				profile_picture	: req.body.profile_picture,
				cover_picture	: req.body.cover_picture,
				about 			: req.body.about
			}})
			.then(profile => {
				resolve(res.json({ profile: profile }))
			})
			.catch(err => {
				reject(res.status(400).json({ 
					message : "Error: Profile update failed" 
				}))
			})
	})
});

router.delete('/', (req, res) => {
	return new Promise((resolve, reject) => {
		profile.findOneAndRemove({username: req.body.username})
			.then(profile => {
				resolve(res.json({ profile: profile }))
			})
			.catch(err => {
				reject(res.status(400).json({ 
					message : "Error: Profile delete failed" 
				}))
			})
	})
});

module.exports = router;