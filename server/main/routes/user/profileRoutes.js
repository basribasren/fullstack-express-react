import { Router } from 'express'
import * as profileController from '@controllers/user/profileController.js'

const router = Router()
// GET /api/profile
router.get('/', profileController.fetchAll)
// GET /api/profile/:username
router.get('/:username', profileController.getOne)
// GET /api/profile/add
router.post('/add', profileController.create)
// GET /api/profile/:username/update
router.put('/:username/update', profileController.update)
// GET /api/profile/:username/delete
router.delete('/:username/delete', profileController.remove)

export default router
