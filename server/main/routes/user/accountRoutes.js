import { Router } from 'express'
import * as accountController from '@controllers/user/accountController.js'
import { verifyToken } from '@middlewares/token-config.js'

const router = Router()
// GET /api/auth
router.get('/', verifyToken, accountController.fetchAll)
// GET /api/auth/sign-in
router.post('/sign-in', accountController.login)
// GET /api/auth/sign-up
router.post('/sign-up', accountController.create)
// GET /api/auth/:id/update
router.put('/:id/update', accountController.update)
// GET /api/auth/:id/delete
router.delete('/:id/delete', accountController.remove)

export default router
