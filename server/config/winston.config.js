import { createLogger, format, transports } from 'winston'
import path from 'path'

/**
 * https://www.youtube.com/watch?v=Dnx2SPdcDSU said "actual time spent logging a line is 0.22sm"
 * @type {[type]}
 */

// setting the filename, where the logs you write
const filenameError = path.join(__dirname, '..', '/logs/winston-error.json')
const filenameCombined = path.join(__dirname, '..', '/logs/winston-combined.json')

const winstonLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	transports: [
		/**
		 *-Write to all logs with level `info` and below to `combined.log`.
		 *-Write all logs error(and below) to `error.log`.
		 */
		new transports.File({
			filename: filenameError,
			level: 'error',
		}),
		new transports.File({
			maxsize: 5210000,
			maxfiles: 5,
			filename: filenameCombined,
		}),
	],
})

/**
 * If we're not in production then **ALSO** log to the `console`
 * with the colorized simple format.
 */
if (process.env.APP_ENV !== 'production') {
	winstonLogger.add(
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple(),
			)
		})
	)
}

export default winstonLogger
