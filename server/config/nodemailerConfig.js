import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

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
		console.log(err)
		throw new Error('generate transporter failed')
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
		transporter.verify(function(error, success) {
			if (error) {
				console.log(error)
				throw new Error('ferivy transporter failed')
			} else {
				console.log(success)
				return console.log("Server is ready to take our messages")
			}
		})
	} catch (err) {
		console.log(err)
		throw new Error('ferivy transporter failed')
	}
}

/**
 * when transporter in idle stat
 * @param  {[type]} transporter [description]
 * @return {[type]}             [description]
 */
export const idleTransporter = (transporter) => {
	try {
		transporter.on("idle", function() {
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
