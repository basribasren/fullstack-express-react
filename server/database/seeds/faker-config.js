import mongoose from 'mongoose'
import dotenv from 'dotenv'
import faker from 'faker'
import mongooseConfig from '@/config/mongooseConfig.js'
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
mongooseConfig(mongoose)

async function runAll() {
	let account = await seedAccount(faker, 10)
	let profile = await seedProfile(faker)
	let game = await seedGame(faker, 100)
	let info = await seedInfo(faker)
	let list = await seedList(faker)
	return process.exit(1)
}

runAll()
