import { getAll } from '@/main/services/game/gameService.js'
import { create, trash } from '@/main/services/game/infoService.js'

const createInfo = (faker, game) => {
	const info = {
		id_game: game._id,
		description: faker.lorem.text(),
		screenshot: [{ image: faker.random.image() }],
		demo: [{ video: faker.internet.url() }],
		size: faker.random.number(),
	}
	return create(info)
}

const seedInfo = async (faker, number) => {
	try {
		await trash()

		let games = await getAll()

		const promiseArray = games.map(game => createInfo(faker, game))

		return await Promise.all(promiseArray)

	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedInfo
