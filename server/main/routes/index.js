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

router.use('/v1/auth', auth)
router.use('/v1/profile', profile)
router.use('/v1/game', game)
router.use('/v1/info', info)
router.use('/v1/list', list)

export default router
