import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

/**
 * Swagger definition.
 */
const swaggerDefinition = {
	info: {
		title: process.env.APP_NAME,
		version: process.env.APP_VERSION,
		description: process.env.APP_DESCRIPTION,
		termsOfService: 'http://swagger.io/terms/',
		contact: {
			email: 'basri.basreen@gmail.com',
		},
		license: {
			name: 'Apache 2.0',
			url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
		},
	},
	basePath: '/',
	securityDefinitions: {
		BasicAuth: {
			type: 'http',
			scheme: 'basic',
		},
		BearerAuth: {
			type: 'bearer',
			scheme: 'basic',
		},
		ApiKeyAuth: {
			type: 'apiKey',
			in: 'header',
			name: 'x-auth-token',
		}
	},
}
/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: [
		path.join(__dirname, '../docs/swagger-config/*.js'),
	],
}

/**
 * Initialize swagger-jsdoc.
 */
const generateSwagger = () => {
	try {
		const swaggerSpec = swaggerJSDoc(swaggerOptions)
		return swaggerSpec
	} catch (err) {
		return
		// console.log('pufffffft')
		// throw new Error('generate swagger configuration failed!')
	}
}

export default generateSwagger
