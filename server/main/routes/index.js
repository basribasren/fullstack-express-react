const express = require('express')
const router = express.Router()

const swaggerSpec = require('../../config/swagger_config')
const auth = require('./user/user_auth')
const profile = require('./user/user_profile')

/**
 * GET /api/swagger.json
 */
router.get('/docs', (req, res) => {
	res.json(swaggerSpec)
})

router.get('/customers', (req, res) => {
	const customers = [
		{ id: 1, firstName: 'John', lastName: 'Doe' },
		{ id: 2, firstName: 'Brad', lastName: 'Traversy' },
		{ id: 3, firstName: 'Mary', lastName: 'Swanson' },
	]

	res.json(customers)
})

router.use('/auth', auth)
router.use('/profile', profile)

module.exports = router
