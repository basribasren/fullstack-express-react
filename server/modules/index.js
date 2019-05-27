import { Router } from 'express'

import auth from './user/userRoutes.js'
import profile from './profile/profileRoutes.js'
import game from './game/gameRoutes.js'
import info from './game-info/infoRoutes.js'
import list from './game-list/listRoutes.js'

const router = Router()

router.use('/v1/auth', auth)
router.use('/v1/profile', profile)
router.use('/v1/game', game)
router.use('/v1/info', info)
router.use('/v1/list', list)

export default router
