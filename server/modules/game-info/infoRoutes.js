import { Router } from 'express'
import * as infoController from './infoController.js'

const router = Router()

// GET /api/game
router.get('/', infoController.fetchAll)

// GET /api/game/:id
router.get('/:id', infoController.getOne)

// GET /api/game/add/:id_game
router.post('/add/:id_game', infoController.create)

// GET /api/game/:id/update/:id_game
router.put('/:id/update/:id_game', infoController.update)

// GET /api/game/:id/delete
router.delete('/:id/delete', infoController.remove)

export default router
