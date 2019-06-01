import { Router } from 'express'
import { check, oneOf } from 'express-validator/check'
import * as userController from './userController.js'
import * as authController from './authController.js'
import { verifyToken } from '@helpers/token.js'
import { loginRateLimit, userRateLimit } from '@helpers/bruteforce.js'

// example
// oneOf([
//   check('programming_language').isIn(['javascript', 'java', 'php']),
//   check('design_tools').isIn(['canva', 'photoshop', 'gimp'])
// ])
// isInt()
// optional()
// oneOf([
//   [
//     check('username').exists(),
//     check('password').exists()
//   ],
//   check('access_token').exists()
// ])

const router = Router()

router.get('/', verifyToken, userController.fetchAll)

router.post('/sign-in',
	[
		oneOf([
			check('username')
			.not().isEmpty().withMessage('username is required'),
			check('username')
			.not().isEmpty().withMessage('username is required')
			.isEmail().withMessage('username is not invalid')
		]),
		check('password')
		.not().isEmpty().withMessage('password is required')
		.not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
		.isLength({ min: 5 }).withMessage('must be at least 5 chars long')
		.matches(/\d/).withMessage('must contain a number')
	],
	loginRateLimit.prevent,
	authController.login,
)

router.post('/sign-out', loginRateLimit.prevent, authController.logout)

router.post('/sign-up', userRateLimit.prevent, userController.create)

router.put('/update/:id', userController.update)

router.delete('/delete/:id', userController.remove)

export default router
