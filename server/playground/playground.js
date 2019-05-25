// import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
import chalk from 'chalk'
import bcrypt from 'bcryptjs'
import Boom from '@hapi/boom'

// import mongooseConfig from '../config/mongooseConfig.js'
// import accountModel from '../main/models/user/accountModel.js'

// dotenv.config()

// if (process.env.APP_ENV === 'development') {
// 	mongoose.set('debug', true)
// }

/**
 * connnection to database mongodb using mongoose
 */
// mongooseConfig(mongoose)

// const generateToken = async user => {
// 	let token = await jwt.sign({ user }, 'secret loh', { expiresIn: '30s' })
// 	console.log(chalk.green(token))
// 	return token
// }

// let user = {
// 	username: 'basri',
// 	password: 'basren'
// }

// let token = generateToken(user)

// console.log(token)

/**
 * NOTE
 * return dari async function adalah Promise {<pending>}
 * throw error in middleware will not passing to error handle
 * to using boomify must create new error first
 * error on using mongoose in here
 * import with aliases is failed
 */

// export const generatePassword = password => {
// 	let hash = bcrypt
// 		.genSalt(10)
// 		.then(salt => {
// 			return bcrypt.hash(password, salt)
// 		})
// 		.catch(err => {
// 			return err
// 		})
// 	return hash
// }

// export const comparePassword = (password, hash) => {
// 	return bcrypt.compare(password, hash)
// }

// let password = 'basri'

// const bcryptFunc = async () => {
// 	let hash = await generatePassword(password)
// 	console.log(hash)
// 	let compare = await comparePassword(password, hash)
// 	console.log(compare)
// }

// bcryptFunc()


// const tryError = () => {
// 	let err = new Error('wkwkw')
// 	let statusCode = err.statusCode || 770
// 	return Boom.boomify(err, { statusCode: statusCode })
// }

// let err = tryError()

// console.log(err)
// const getAllAccount = () => {
// 	console.log('1')
// 	accountModel
// 		.find()
// 		.sort({ date_created: -1 })
// 		.limit(1000)
// 		.then(result => {
// 			return result
// 		})
// 		.catch(err => {
// 			let statusCode = err.statusCode || 500
// 			return Boom.boomify(err, { statusCode: statusCode })
// 		})
// }
// getAllAccount()
