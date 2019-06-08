import ExpressBrute from 'express-brute'
import MongooseStore from 'express-brute-mongoose'
import moment from 'moment'
import bruteModel from '@modules/brute/bruteModel.js'
import { errorPayload } from '@helpers/payload.js'

const store = new MongooseStore(bruteModel);

/**
 * generate error payload for consistent return
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
const generateError = (err) => {
	let error = {
		output: {
			statusCode: 423,
			payload: {
				message: err.message,
				error: 'Locked',
				headers: {},
			},
		},
	}
	return errorPayload(error, err.url, err.method)
}

const failCallback = (req, res, next, nextValidRequestDate) => {
	let time = moment(nextValidRequestDate).fromNow()
	let payload = generateError({
		message: `You've made too many failed attempts in a short period of time, please try again ${time}`,
		url: req.url,
		method: req.method
	})
	return res.status(401).send(payload)
}

// No more than 1000 login attempts per day per IP
export const loginRateLimit = new ExpressBrute(store, {
	freeRetries: 100,
	attachResetToRequest: false,
	refreshTimeoutOnRequest: false,
	minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
	maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
	lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
	failCallback: failCallback,
})


// Start slowing requests after 5 failed attempts to do something for the same user
export const userRateLimit = new ExpressBrute(store, {
	freeRetries: 5,
	minWait: 5 * 60 * 1000, // 5 minutes
	maxWait: 60 * 60 * 1000, // 1 hour
	failCallback: failCallback,
})
