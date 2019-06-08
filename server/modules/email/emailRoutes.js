import { Router } from 'express'
import { check, oneOf } from 'express-validator/check'
import * as emailController from './emailController.js'

const router = Router()

/**
 * POST SEND EMAIL - SKENARIO
 */
router.post('/send-email',
	[
		check('receiver')
		.not().isEmpty().withMessage('receiver is required')
		.isEmail().withMessage('receiver is must email'),
		check('title')
		.not().isEmpty().withMessage('title is required')
		.isString().withMessage('title must be string'),
		check('type')
		.isIn(['html', 'amp', 'text'])
	],
	emailController.sendEMailConfirmation
)

export default router
