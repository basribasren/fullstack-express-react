import { Router } from 'express'
import { check, oneOf } from 'express-validator/check'
import * as userController from './userController.js'
import * as authController from './authController.js'

import { verifyToken } from '@helpers/authentication.js'
import { loginRateLimit, userRateLimit } from '@helpers/bruteforce.js'

const router = Router()

/**
 * GET USER - SKENARIO
 * @skenario 1 - user is must login
 * @skenario 2 - user is must admin
 * @skenario 3 - user is must have token
 * @skenario 4 - request must prevent by 100 req/day
 */
router.get('/', verifyToken, userController.fetchAll)

/**
 * POST SIGN-IN SKENARIO
 * @skenario 1 - user is must not login
 * @skenario 3 - user is must not have token
 * @skenario 3 - validation req.body
 * @skenario 4 - request must prevent by 100 req/day
 */
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
		.isLength({ min: 5 }).withMessage('password must be at least 5 chars long')
	],
	loginRateLimit.prevent,
	authController.login,
)

/**
 * POST SIGN-OUT SKENARIO
 * @skenario 1 - user is must login
 * @skenario 3 - user is must have token
 * @skenario 3 - validation req.header
 * @skenario 4 - request must prevent by 100 req/day
 */
router.post('/sign-out',
	[
		check('x-auth-token').not().isEmpty().withMessage('no token set')
	],
	loginRateLimit.prevent,
	authController.logout,
)

/**
 * POST SIGN-UP SKENARIO
 * @skenario 1 - user is must not login
 * @skenario 2 - user is must not have token
 * @skenario 3 - validation req.body
 * @skenario 4 - request must prevent by 100 req/day
 */
router.post('/sign-up',
	// userRateLimit.prevent, 
	authController.register
)

/**
 * PUT USER SKENARIO
 * @skenario 1 - user is must login
 * @skenario 2 - user is must have token
 * @skenario 3 - user is self
 * @skenario 3 - validation req.body
 * @skenario 4 - request must prevent by 100 req/day
 * ? is admin can update user
 */
router.put('/update/:id', userController.update)

/**
 * DELETE USER SKENARIO
 * @skenario 1 - user is must login
 * @skenario 2 - user is must have token
 * @skenario 3 - user is self
 * @skenario 3 - validation req.body
 * @skenario 4 - request must prevent by 100 req/day
 * ? is admin can delete user
 */
router.delete('/delete/:id', userController.remove)

export default router
