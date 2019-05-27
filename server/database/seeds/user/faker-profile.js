import { getAllUser } from '@modules/user/userService.js'
import { create, dropProfile } from '@modules/profile/profileService.js'

const createProfile = (faker, account) => {
	const contacts = [{
		contact: faker.phone.phoneNumber(),
		category: 'phone',
	}, {
		contact: faker.phone.phoneNumber(),
		category: 'phone',
	}]
	const address = [{
		country: faker.address.country(),
		province: faker.address.state(),
		city: faker.address.city(),
		subdistrict1: faker.address.streetName(),
		subdistrict2: faker.address.streetSuffix(),
		street: faker.address.streetAddress(),
		postal_code: faker.address.zipCode(),
	}, {
		country: faker.address.country(),
		province: faker.address.state(),
		city: faker.address.city(),
		subdistrict1: faker.address.streetName(),
		subdistrict2: faker.address.streetSuffix(),
		street: faker.address.streetAddress(),
		postal_code: faker.address.zipCode(),
	}]
	const milestones = [{
		since: faker.date.past(),
		region: faker.address.country(),
		location: {
			lang: faker.address.longitude(),
			lat: faker.address.latitude(),
		},
	}]
	const profile = {
		id_user: account._id,
		username: account.username,
		email: account.email,
		name: faker.name.findName(),
		logo_image: faker.image.avatar(),
		cover_image: faker.image.business(),
		description: faker.lorem.text(),
		feature: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
		contacts: contacts,
		address: address,
		milestones: milestones,
	}
	return create(profile)
}
const seedProfile = async faker => {
	try {
		await dropProfile()

		let accounts = await getAllUser()

		const promiseArray = accounts.map(account => createProfile(faker, account))

		return await Promise.all(promiseArray)

	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedProfile
