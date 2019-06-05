// import Boom from '@hapi/boom'
// import sessionModel from './sessionModel.js'
// import { isEmpty } from '@helpers/validation.js'

// /**
//  * get session by token
//  * @param  {String} token [description]
//  * @return {[type]}          [description]
//  */
// export const getByToken = token => {
// 	return sessionModel
// 		.findOne({ token: token })
// 		.then(result => {
// 			if (isEmpty(result)) {
// 				throw Boom.notFound(`Data session with token ${token} is Not Found`)
// 			}
// 			return result
// 		})
// 		.catch(err => {
// 			if (err.statusCode === undefined) {
// 				throw Boom.boomify(err, { statusCode: 409 })
// 			}
// 			throw err
// 		})
// }

// /**
//  * create session
//  * @param  {Object} data [description]
//  * @return {[type]}      [description]
//  */
// export const create = data => {
// 	return sessionModel
// 		.create(data)
// 		.then(result => {
// 			return result
// 		})
// 		.catch(err => {
// 			if (err.statusCode === undefined) {
// 				throw Boom.boomify(err, { statusCode: 409 })
// 			}
// 			throw err
// 		})
// }

// /**
//  * update session by token
//  * @param  {String} token [description]
//  * @param  {Object} data     [description]
//  * @return {[type]}          [description]
//  */
// export const update = (token, data) => {
// 	return sessionModel
// 		.findOneAndUpdate({ token: token }, { $set: data })
// 		.then(result => {
// 			if (isEmpty(result)) {
// 				throw Boom.notFound(`Data session with token ${token} is Not Found`)
// 			}
// 			return result
// 		})
// 		.catch(err => {
// 			if (err.statusCode === undefined) {
// 				throw Boom.boomify(err, { statusCode: 409 })
// 			}
// 			throw err
// 		})
// }

// /**
//  * delete session by token
//  * @param  {String} token [description]
//  * @return {[type]}          [description]
//  */
// export const remove = token => {
// 	return sessionModel
// 		.findOneAndDelete({ token: token })
// 		.then(result => {
// 			if (isEmpty(result)) {
// 				throw Boom.notFound(`Data session with token ${token} is Not Found`)
// 			}
// 			return result
// 		})
// 		.catch(err => {
// 			if (err.statusCode === undefined) {
// 				throw Boom.boomify(err, { statusCode: 409 })
// 			}
// 			throw err
// 		})
// }

// /**
//  * delete collection database
//  * @return {[type]} [description]
//  */
// export const dropToken = () => {
// 	return sessionModel.collection
// 		.drop()
// 		.then(() => {
// 			console.log('drop session success')
// 			return
// 		})
// 		.catch(err => {
// 			if (err.statusCode === undefined) {
// 				throw Boom.boomify(err, { statusCode: 409 })
// 			}
// 			throw err
// 		})
// }
