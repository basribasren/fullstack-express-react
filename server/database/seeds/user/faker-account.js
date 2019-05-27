import { generatePassword } from '@helpers/password.js'
import { createUser, dropUser } from '@modules/user/userService.js'

const seedAccount = async (faker, number) => {
	try {
		await dropUser()
		let hashPassword = await generatePassword('helloworld')
		for (var i = 0; i < number; i++) {
			const account = {
				username: faker.internet.userName(),
				password: hashPassword,
				email: faker.internet.email(),
				role: 'admin',
				active: faker.random.boolean(),
			}
			await createUser(account)
		}
		return
	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedAccount
