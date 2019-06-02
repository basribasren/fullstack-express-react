import { createLogger, format, transports } from 'winston'
import fs from 'fs'
import path from 'path'

/**
 * https://www.youtube.com/watch?v=Dnx2SPdcDSU said "actual time spent logging a line is 0.22sm"
 * @type {[type]}
 */

// setting the filename, where the logs you write
const filenameError = path.join(__dirname, '..', '/logs/winston-error.log')
const filenameCombined = path.join(__dirname, '..', '/logs/winston-combined.log')

// Logging levels
const config = {
	levels: {
		error: 0,
		debug: 1,
		warn: 2,
		data: 3,
		info: 4,
		verbose: 5,
		silly: 6,
		custom: 7
	},
	colors: {
		error: 'red',
		debug: 'blue',
		warn: 'yellow',
		data: 'grey',
		info: 'green',
		verbose: 'cyan',
		silly: 'magenta',
		custom: 'yellow'
	}
}

const winstonLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.label({ label: '[my-label]' }),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	transports: [
		/**
		 *-Write to all logs with level `info` and below to `combined.log` 
		 *-Write all logs error(and below) to `error.log`.
		 */
		new transports.File({
			filename: filenameError,
			level: 'error'
		}),
		new transports.File({
			maxsize: 5210000,
			maxfiles: 5,
			filename: filenameCombined
		})
	],
})
/**
 * If we're not in production then **ALSO** log to the `console`
 * with the colorized simple format.
 */
if (process.env.APP_ENV !== 'production') {
	winstonLogger.add(new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple()
		)
	}))
}

export default winstonLogger

/**************************************
// ***************
// Allows for JSON logging
// ***************

logger.log({
  level: 'info',
  message: 'Pass an object and this works',
  additional: 'properties',
  are: 'passed along'
})

logger.info({
  message: 'Use a helper method if you want',
  additional: 'properties',
  are: 'passed along'
})

// ***************
// Allows for parameter-based logging
// ***************

logger.log('info', 'Pass a message and this works', {
  additional: 'properties',
  are: 'passed along'
})

logger.info('Use a helper method if you want', {
  additional: 'properties',
  are: 'passed along'
})

// ***************
// Allows for string interpolation
// ***************

// info: test message my string {}
logger.log('info', 'test message %s', 'my string')

// info: test message my 123 {}
logger.log('info', 'test message %d', 123)

// info: test message first second {number: 123}
logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 })

// prints "Found error at %s"
logger.info('Found %s at %s', 'error', new Date())
logger.info('Found %s at %s', 'error', new Error('chill winston'))
logger.info('Found %s at %s', 'error', /WUT/)
logger.info('Found %s at %s', 'error', true)
logger.info('Found %s at %s', 'error', 100.00)
logger.info('Found %s at %s', 'error', ['1, 2, 3'])

// ***************
// Allows for logging Error instances
// ***************

logger.warn(new Error('Error passed as info'))
logger.log('error', new Error('Error passed as message'))

logger.warn('Maybe important error: ', new Error('Error passed as meta'))
logger.log('error', 'Important error: ', new Error('Error passed as meta'))

logger.error(new Error('Error as info'))
**************************************/
