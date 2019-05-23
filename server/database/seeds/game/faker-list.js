import { getAll } from '@/main/services/game/gameService.js'
import { getRandomOne } from '@/main/services/user/profileService.js'
import { create, trash } from '@/main/services/game/listService.js'

const createList = (faker, games, profile) => {
	const lists = []
	games.map(game => {
		lists.push({ id_game: game._id })
	})
	const list = {
		id_profile: profile._id,
		list_game: lists,
	}
	return create(list)
}

const seedInfo = async (faker, number) => {
	try {
		await trash()

		let games = await getAll()
		let profile = await getRandomOne()
		return await createList(faker, games, profile[0])
	} catch (err) {
		return Promise.reject(err.message)
	}
}

export default seedInfo
