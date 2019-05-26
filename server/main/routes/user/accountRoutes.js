import { Router } from 'express'
import * as accountController from '@controllers/user/accountController.js'
import { verifyToken } from '@middlewares/token-config.js'

const router = Router()

// GET /api/auth
/**
 * @swagger
 * /api/v1/auth/:
 *   get:
 *     tags:
 *       - account
 *     summary: get all list account
 *     description: get all account
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 *       401:
 *         description: Unauthorized
 *     security:
 *       - token: []
 *     x-swagger-router-controller: 'account'
 */
router.get('/', verifyToken, accountController.fetchAll)

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     tags:
 *       - account
 *     summary: sign-in to get token
 *     description: Sign-in with username and password
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: username and password need to be sign-in
 *         required: true
 *         schema: {
 *         		type: object,
 *         '	required': [
 *         			'username',
 *         		 	'password',
 *         		],
 *         		'properties': {
 *         			'username':{
 *         				'type': 'string',
 *         				'example': 'jabal.pudjiastuti'
 *         			},
 *         			'password':{
 *         		 		'type': 'string',
 *         		 		'example' : 'helloworld'
 *         		 	},
 *         		 }
 *         	}
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Passowrd Not Match
 */
router.post('/sign-in', accountController.login)

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - account
 *     summary: Sign-up to create account
 *     description: Sign-up with username, password, email, and role
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: username, password, email, and role is required to be sign-up
 *         required: true
 *         schema: {
 *         		type: object,
 *         '	required': [
 *         			'username',
 *         		 	'password',
 *         		 	'email',
 *         		 	'role',
 *         		],
 *         		'properties': {
 *         			'username':{
 *         				'type': 'string',
 *         				'example': 'basribasreen'
 *         			},
 *         			'password':{
 *         		 		'type': 'string',
 *         		 		'example' : 'basribasreen'
 *         		 	},
 *         			'email':{
 *         		 		'type': 'string',
 *         		 		'example' : 'basri.basreen@gmail.com'
 *         		 	},
 *         			'role':{
 *         		 		'type': 'string',
 *         		 		'example' : 'user'
 *         		 	},
 *         		 }
 *         	}
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Passowrd Not Match
 */

router.post('/sign-up', accountController.create)

/**
 * @swagger
 * /api/v1/auth/update/{id}:
 *   put:
 *     tags:
 *       - account
 *     summary: Update account
 *     description: update account with this endpoint
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: set id account
 *         type: string
 *         required: true
 *         x-example: '5ce9e593fcceeb1e08cca0f6'
 *       - in: body
 *         name: body
 *         description: password, email, and role is required to be update
 *         required: false
 *         schema: {
 *         		type: object,
 *         '	required': [
 *         		 	'password',
 *         		 	'email',
 *         		 	'role',
 *         		],
 *         		'properties': {
 *         			'password':{
 *         		 		'type': 'string',
 *         		 		'example' : 'basribasreen'
 *         		 	},
 *         			'email':{
 *         		 		'type': 'string',
 *         		 		'example' : 'basri.basreen@gmail.com'
 *         		 	},
 *         			'role':{
 *         		 		'type': 'string',
 *         		 		'example' : 'user'
 *         		 	},
 *         		 }
 *         	}
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Conflict
 */
router.put('/update/:id', accountController.update)

/**
 * @swagger
 * /api/v1/auth/delete/{id}:
 *   delete:
 *     tags:
 *       - account
 *     summary: Delete account
 *     description: Delete account by _id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: set id account
 *         type: string
 *         required: true
 *         x-example: '5ce9e593fcceeb1e08cca0f6'
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Conflict
 */
router.delete('/delete/:id', accountController.remove)

export default router
