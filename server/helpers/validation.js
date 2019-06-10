/**
 * on route, we use express validator
 * and here we check the result of express-validator
 * @param  {[type]} errors [description]
 * @return {[type]}        [description]
 */
export const takeOurError = async errors => {
	let message = []
	errors.array().map(err => {
		message.push(err.msg)
	})
	return message
}

/**
 * validation object is empty or not
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export const isEmpty = obj => {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false
	}
	return true
}


/**
 * Still not Using
 * @param  {String} value [description]
 * @return {[type]}       [description]
 */

// export const parseToString = (value = '') => {
// 	value.toString()
// }

// export const parseToData = value => {
// 	const date = Date.parse(value)
// 	if (isNaN(date)) {
// 		return null
// 	} else {
// 		return new Date(date)
// 	}
// }

// export const isArray = value => {
// 	return Array.isArray(value) ? true : false
// }

// export const isNumber = value => {
// 	!isNaN(parseFloat(value)) && isFinite(value)
// }

// export const parseToFloat = value => (isNumber(value) ? parseFloat(value) : null)

// export const getPositiveNumber = value => {
// 	const n = parseToFloat(value)
// 	if (n >= 0) {
// 		return n
// 	} else {
// 		return null
// 	}
// }

// export const getBooleanIfValid = (value) => {
// 	if (value === 'true' || value === 'false') {
// 		return value === 'true'
// 	} else {
// 		return typeof value === 'boolean' ? value : null
// 	}
// }
