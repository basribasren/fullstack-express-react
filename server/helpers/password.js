import bcrypt from 'bcryptjs'

/**
 * generate hash of password
 * @param  {String} password [description]
 * @return {[type]}          [description]
 */
export const generatePassword = password => {
	let hash = bcrypt
		.genSalt(10)
		.then(salt => {
			return bcrypt.hash(password, salt)
		})
		.catch(err => {
			return err
		})
	return hash
}

/**
 * compare password input with hash result
 * @param  {[type]} password [description]
 * @param  {[type]} hash     [description]
 * @return {[type]}          [description]
 */
export const comparePassword = (password, hash) => {
	return bcrypt.compare(password, hash)
}
