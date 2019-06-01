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
const generateError = (message) => {
	return errorPayload({
		output: {
			statusCode: 423,
			payload: {
				message: message,
				error: 'Locked',
				headers: {},
			},
		},
	})
}

const failCallback = (req, res, next, nextValidRequestDate) => {
	let payload = generateError("You've made too many failed attempts in a short period of time, please try again " + moment(nextValidRequestDate).fromNow())
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
