const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')
require('dotenv').config()

/**
 * Swagger definition.
 */
const swaggerDefinition = {
	info: {
		title: process.env.APP_NAME,
		version: process.env.APP_VERSION,
		description: process.env.APP_DESCRIPTION,
	},
	basePath: '/api',
}

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: [
		path.join(__dirname, '../routes/index.js'),
		path.join(__dirname, '../docs/*.js'),
		path.join(__dirname, '../docs/*.yml'),
		path.join(__dirname, '../docs/*.yaml'),
	]
}

/**
 * Initialize swagger-jsdoc.
 */
const swaggerSpec = swaggerJSDoc(swaggerOptions)

module.exports = swaggerSpec
