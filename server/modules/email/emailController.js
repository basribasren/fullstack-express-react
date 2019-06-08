import Boom from '@hapi/boom'
import { validationResult } from 'express-validator/check'
import { generatedTransporter } from '@config/nodemailerConfig.js'

import { generateMessage, sendMessage } from '@helpers/nodemailer.js'
import { successPayload } from '@helpers/payload.js'

/**
 * on route, we use express validator
 * and here we check the result of express-validator
 * @param  {[type]} errors [description]
 * @return {[type]}        [description]
 */
const cekValidation = errors => {
	let listError = []
	errors.array().map(err => {
		listError.push(err.msg)
	})
	let newError = new Error(listError)
	return newError
}

/**
 * SEND EMAIL KONFIRMATION - SKENARIO
 * @skenario 1 - take username, email, and urlConfirmation
 * @skenario 2 - generate message that want to send
 * @skenario 3 - send message
 */
export const sendEMailConfirmation = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = cekValidation(errors)
			throw Boom.boomify(newError, { statusCode: 422 })
		}

		let { receiver, title, content, type } = req.body
		let data = {
			from: '"Basri Basren" <basri.official.acc@gmail.com>',
			to: receiver,
			title: title,
			content: content,
			type: type,
		}
		const transporter = generatedTransporter()
		let message = await generateMessage(data)
		let info = await sendMessage(transporter, message)

		let payload = successPayload(200, `Email ${info.messageId} has been send`, info, req.url, req.method)
		res.status(200).send(payload)
	} catch (err) {
		if (!err.statusCode) {
			throw Boom.boomify(err, { statusCode: 409 })
		}
		next(err)
	}
}

/**
 * SEND EMAIL RESET PASSWORD - SKENARIO
 * 
 */
