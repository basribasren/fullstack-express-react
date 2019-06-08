import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import winstonLogger from '@config/winston.config.js'

const logger = winstonLogger
/**
 * send e-mails from Node.js – easy as cake! 🍰✉️
 * using nodemailer-mailgun-transport with nodemailer to send email using Mailgun's awesomeness! 
 * @return {[type]} [description]
 */
export const generatedTransporter = () => {
	try {
		let auth = {
			auth: {
				api_key: process.env.MAILGUN_API_KEY,
				domain: process.env.MAILGUN_DOMAIN,
			},
		}
		let transporter = nodemailer.createTransport(mg(auth))

		logger.info('generate transporter success', {
			service: 'nodemailer',
			method: null,
		})
		return transporter
	} catch (err) {
		logger.error('generate transporter failed', {
			service: 'nodemailer',
			method: null,
		})
		return
	}
}

/**
 * when transporter in idle stat
 * @param  {[type]} transporter [description]
 * @return {[type]}             [description]
 */
export const idleTransporter = transporter => {
	try {
		transporter.on('idle', function() {
			while (transporter.isIdle() && messages.length) {
				transporter.sendMail(messages.shift())
			}
		})
	} catch (err) {
		return
	}
}
