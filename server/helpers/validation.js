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
