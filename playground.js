// import mongoose from 'mongoose'
// import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import chalk from 'chalk'


// import mongooseConfig from '../config/mongooseConfig.js'
// import accountModel from '../main/models/user/accountModel.js'

dotenv.config()

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


// import bcrypt from 'bcryptjs'
// import Boom from '@hapi/boom'


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

/**
 * Try error handler
 */
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

/**
 * Upload File
 */
/*import fs from 'fs';

const readFile = (path = './foo.txt') => {
	fs.readFile(path, (err, body) => {
		if (err) {
			console.error(err);
		} else {
			console.log(body);
		}
	});
}
fs.unlink('/tmp/hello', (err) => {
	if (err) throw err;
	console.log('successfully deleted /tmp/hello');
});
fs.rename('/tmp/hello', '/tmp/world', (err) => {
	if (err) throw err;
	console.log('renamed complete');
});
fs.stat('/tmp/world', (err, stats) => {
	if (err) throw err;
	console.log(`stats: ${JSON.stringify(stats)}`);
});
fs.open('/open/some/file.txt', 'r', (err, fd) => {
	if (err) throw err;
	fs.close(fd, (err) => {
		if (err) throw err;
	});
});
const fileUrl = new URL('file:///tmp/hello');

fs.readFileSync(fileUrl);

// On Windows :

// - WHATWG file URLs with hostname convert to UNC path
// file://hostname/p/a/t/h/file => \\hostname\p\a\t\h\file
fs.readFileSync(new URL('file://hostname/p/a/t/h/file'));

// Example when handled through fs.watch() listener
fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
	if (filename) {
		console.log(filename);
		// Prints: <Buffer ...>
	}
});
fs.appendFile('message.txt', 'data to append', (err) => {
	if (err) throw err;
	console.log('The "data to append" was appended to file!');
});

// destination.txt will be created or overwritten by default.
fs.copyFile('source.txt', 'destination.txt', (err) => {
	if (err) throw err;
	console.log('source.txt was copied to destination.txt');
});
// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
	if (err) throw err;
});
fs.rename('oldFile.txt', 'newFile.txt', (err) => {
	if (err) throw err;
	console.log('Rename complete!');
});
readFile(pathUpload)

const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('message.txt', data, (err) => {
	if (err) throw err;
	console.log('The file has been saved!');
});

const fsPromises = require('fs').promises;

// destination.txt will be created or overwritten by default.
fsPromises.copyFile('source.txt', 'destination.txt')
	.then(() => console.log('source.txt was copied to destination.txt'))
	.catch(() => console.log('The file could not be copied'));


console.log(__dirname);
// Prints: /Users/mjr
console.log(path.dirname(__filename));
// Prints: /Users/mjr

console.log(__filename);
// Prints: /Users/mjr/example.js
console.log(__dirname);
// Prints: /Users/mjr
*/

/**
 * sending mail using mailgun
 */

import { generatedTransporter } from '@config/nodemailerConfig.js'
import { generateMessage, sendMail } from '@helpers/nodemailer.js'

let data = {
	from: 'aroonzfi@gmail.com',
	to: 'basri.keren@gamil.com',
	title: 'pufft',
	type: 'amp',
}
let transporter = generatedTransporter()
let message = generateMessage(data)

// sendMail(transporter, message)