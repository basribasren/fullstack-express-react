import { Router } from 'express'

import * as accountController from '@/main/controllers/user/accountController.js'
// import { findUser, userValidator } from '../validators/userValidator'

const router = Router()
/**
 * GET /api/auth
 */
router.get('/', accountController.fetchAll)
router.post('/sign-in', accountController.login)
router.post('/sign-up', accountController.create)
router.put('/update/:id', accountController.update)
router.delete('/delete/:id', accountController.remove)

export default router
