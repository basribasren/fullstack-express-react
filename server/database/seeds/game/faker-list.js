import { getAll } from '@modules/game/gameService.js'
import { getRandomOne } from '@modules/profile/profileService.js'
import { create, trash } from '@modules/game-list/listService.js'

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

const seedInfo = async faker => {
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
