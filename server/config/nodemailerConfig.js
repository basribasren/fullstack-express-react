import Boom from '@hapi/boom'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger
/**
 * generate transporter using mailgun
 * @return {[type]} [description]
 */
export const generatedTransporter = () => {
	try {
		// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
		let auth = {
			auth: {
				api_key: process.env.MAILGUN_API_KEY,
				domain: process.env.MAILGUN_DOMAIN,
			},
		}
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport(mg(auth))

		return transporter
	} catch (err) {
		logger.error('generate transporter failed', {
			service: 'nodemailer',
			method: null,
		})
		throw new Error('generate transporter failed!')
	}
}

/**
 * verify configuration of transporter
 * @param  {[type]} transporter [description]
 * @return {[type]}             [description]
 */
export const verifyTransporter = transporter => {
	try {
		// verify connection configuration
		transporter.verify(success => {
			if (!success) {
				logger.error('verify transporter failed', {
					service: 'nodemailer',
					method: null,
				})
				throw new Error('verify transporter failed')
			} else {
				logger.error('verify transporter success', {
					service: 'nodemailer',
					method: null,
				})
				return
			}
		})
	} catch (err) {
		logger.error('transporter is not found', {
			service: 'nodemailer',
			method: null,
		})
		throw new Error('verify transporter failed')
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
			// send next message from the pending queue
			while (transporter.isIdle() && messages.length) {
				transporter.sendMail(messages.shift())
			}
		})
	} catch (err) {
		console.log(err)
		throw new Error('ferivy transporter failed')
	}
}
