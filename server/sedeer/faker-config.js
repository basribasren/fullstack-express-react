import mongoose from 'mongoose'
import dotenv from 'dotenv'
import faker from 'faker'
import mongoose_setting from '@/config/mongoose_config.js'
import seedAccount from './faker-account.js'
import seedProfile from './faker-profile.js'

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
// seedAccount(faker, 10)
seedProfile(faker, 10)
