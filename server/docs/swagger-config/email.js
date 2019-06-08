/**
 * @swagger
 * /api/v1/email/send-email:
 *   post:
 *     tags:
 *       - email
 *     summary: Send Confirmation Email
 *     description: Send Confirmation Email
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: username and email is required to be sendmail
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
 *         				'example': 'basribasreen'
 *         			},
 *         			'email':{
 *         		 		'type': 'string',
 *         		 		'example' : 'basri.basreen@gmail.com'
 *         		 	},
 *         			'title':{
 *         		 		'type': 'string',
 *         		 		'example' : 'Try sending email'
 *         		 	},
 *         			'type':{
 *         		 		'type': 'string',
 *         		 		'example' : 'amp'
 *         		 	},
 *         		 }
 *         	}
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Passowrd Not Match
 */
