import { create, trash } from '@/main/services/game/gameService.js'

const seedGame = async (faker, number) => {
	try {
		await trash()

		for (var i = 0; i < number; i++) {
			const game = {
				title: faker.lorem.word(),
				logo_image: faker.image.avatar(),
				cover_image: faker.image.business(),
				url: faker.internet.url(),
			}
			await create(game)
		}
		return
	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedGame
