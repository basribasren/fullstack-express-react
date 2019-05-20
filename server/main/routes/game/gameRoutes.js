import { Router } from 'express'
import * as gameController from '@/main/controllers/game/gameController.js'

const router = Router()
// GET /api/game
router.get('/', gameController.fetchAll)
// GET /api/game/:id
router.get('/:id', gameController.getOne)
// GET /api/game/add
router.post('/add', gameController.create)
// GET /api/game/:id/update
router.put('/:id/update', gameController.update)
// GET /api/game/:id/delete
router.delete('/:id/delete', gameController.remove)

export default router
