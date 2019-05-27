import { Router } from 'express'
import * as userController from './userController.js'
import * as authController from './authController.js'
import { verifyToken } from '@helpers/token.js'

const router = Router()

router.get('/', verifyToken, userController.fetchAll)

router.post('/sign-in', authController.login)

router.post('/sign-out', authController.logout)

router.post('/sign-up', userController.create)

router.put('/update/:id', userController.update)

router.delete('/delete/:id', userController.remove)

export default router
