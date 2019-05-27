import { Router } from 'express'
import * as gameController from './gameController.js'

const router = Router()

// GET /api/v1/game
router.get('/', gameController.fetchAll)

// GET /api/v1/game/:id
router.get('/:id', gameController.getOne)

// GET /api/v1/game/add
router.post('/add', gameController.create)

// GET /api/v1/game/update/:id
router.put('/update/:id', gameController.update)

// GET /api/v1/game/delete/:id
router.delete('/delete/:id', gameController.remove)

export default router
