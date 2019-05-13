import { Router } from 'express'

// const swaggerSpec = require('../../config/swagger_config')
// const profile = require('./user/user_profile')

import auth from './user/accountRoutes.js'

const router = Router()

/**
 * GET /api/swagger.json
 */
// router.get('/docs', (req, res) => {
// 	res.json(swaggerSpec)
// })

router.get('/customers', (req, res) => {
	const customers = [
		{ id: 1, firstName: 'John', lastName: 'Doe' },
		{ id: 2, firstName: 'Brad', lastName: 'Traversy' },
		{ id: 3, firstName: 'Mary', lastName: 'Swanson' },
	]

	res.json(customers)
})

router.use('/auth', auth)
// router.use('/profile', profile)


export default router
