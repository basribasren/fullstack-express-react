import { Router } from 'express'
import * as listController from '@/main/controllers/game/listController.js'

const router = Router()
// GET /api/list
router.get('/', listController.fetchAll)
// GET /api/list/:id
router.get('/:id', listController.getOne)
// GET /api/list/add/:id_profile
router.post('/add/:id_profile', listController.create)
// GET /api/list/:id/update/:id_profile
router.put('/:id/update/:id_profile', listController.update)
// GET /api/list/:id/delete
router.delete('/:id/delete', listController.remove)

export default router
