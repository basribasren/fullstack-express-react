import { getAllAccount } from '@/main/services/user/accountService.js'
import { create, dropProfile } from '@/main/services/user/profileService.js'

const seedAccount = async (faker, number) => {
	try {
		let drop = await dropProfile()
		let accounts = await getAllAccount()

		accounts.map(account => {
			const profile = {
				id_account: account._id,
				username: account.username,
				email: account.email,
				name: faker.name.findName(),
				logo_image: faker.image.avatar(),
				cover_image: faker.image.business(),
				description: faker.lorem.text(),
				feature: [faker.lorem.sentence()],
				contacts: [{
					contact: faker.phone.phoneNumber(),
					category: 'phone',
				}],
				address: [{
					country: faker.address.country(),
					province: faker.address.state(),
					city: faker.address.city(),
					subdistrict1: faker.address.streetName(),
					subdistrict2: faker.address.streetSuffix(),
					street: faker.address.streetAddress(),
					postal_code: faker.address.zipCode(),
				}],
				milestones: [{
					since: faker.date.past(),
					region: faker.address.country(),
					location: {
						lang: faker.address.longitude(),
						lat: faker.address.latitude(),
					},
				}],
			}
			let data = create(profile)
		})
		return
	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedAccount
