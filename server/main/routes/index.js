import { Router } from 'express'

// const swaggerSpec = require('../../config/swagger_config')

import auth from './user/accountRoutes.js'
import profile from './user/profileRoutes.js'
import game from './game/gameRoutes.js'
import info from './game/infoRoutes.js'
import list from './game/listRoutes.js'

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
router.use('/profile', profile)
router.use('/game', game)
router.use('/info', info)
router.use('/list', list)

export default router
