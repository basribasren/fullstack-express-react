import mongoose from 'mongoose'
import dotenv from 'dotenv'
import faker from 'faker'
import mongoose_setting from '@/config/mongoose_config.js'
import seedAccount from './user/faker-account.js'
import seedProfile from './user/faker-profile.js'
import seedGame from './game/faker-game.js'
import seedInfo from './game/faker-info.js'
import seedList from './game/faker-list.js'

faker.locale = 'id_ID'

dotenv.config()

if (process.env.APP_ENV === 'development') {
	mongoose.set('debug', true)
}

/**
 * connnection to database mongodb using mongoose
 */
mongoose_setting(mongoose)

/**
 * generate data account
 */
const seedUser = async () => {
	await seedAccount(faker, 10)
	await seedProfile(faker, 10)
	return process.exit(1)
}
const seedGames = async () => {
	await seedGame(faker, 10)
	await seedInfo(faker, 10)
	return process.exit(1)
}
const seedLists = async () => {
	await seedList(faker, 10)
	return process.exit(1)
}
// seedUser()
// seedGames()
seedLists()
