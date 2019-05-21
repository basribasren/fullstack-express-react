import { generatePassword } from '@/main/middlewares/password-config.js'
import { createAccount, dropAccount } from '@/main/services/user/accountService.js'

const seedAccount = async (faker, number) => {
	try {
		let drop = await dropAccount()
		let hashPassword = await generatePassword('helloworld')
		for (var i = 0; i < number; i++) {
			const account = {
				username: faker.internet.userName(),
				password: hashPassword,
				email: faker.internet.email(),
				role: 'admin',
				active: faker.random.boolean(),
			}
			let data = await createAccount(account)
		}
		return
	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedAccount
