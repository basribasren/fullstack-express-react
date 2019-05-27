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
 *         				'example': 'usyi.pratiwi'
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
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     tags:
 *       - account
 *     summary: sign-out to delete session
 *     description: Sign-out with token
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         description: token need to be delete session
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Conflict
 */

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
