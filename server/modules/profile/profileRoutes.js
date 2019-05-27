import { Router } from 'express'
import * as profileController from './profileController.js'

const router = Router()

// GET /api/v1/profile
router.get('/', profileController.fetchAll)

// GET /api/v1/profile/:username
router.get('/:username', profileController.getOne)

// GET /api/v1/profile/add
router.post('/add', profileController.create)

// GET /api/v1/profile/update/:username
router.put('/update/:username', profileController.update)

// GET /api/v1/profile/delete/:username
router.delete('/delete/:username', profileController.remove)

export default router
