import chalk from 'chalk'
import mongoose from 'mongoose'

const onClose = () => {
	console.info(chalk.blue('Mongoose: ') + chalk.yellow('MongoDB connection was closed'))
}

const onReconnect = () => {
	console.log(chalk.blue('Mongoose: ') + chalk.yellow('MongoDB reconnected'))
}

const onOpen = () => {
	console.log(chalk.blue('Mongoose: ') + chalk.green('Successfully connected to database'))
}

const onError = () => {
	console.error(chalk.blue('Mongoose: ') + chalk.red('Connection Error: Could not connect to MongoDB!'))
}

const mongooseConfig = () => {
	if (process.env.APP_ENV === 'development') {
		mongoose.set('debug', true)
	}
	mongoose.connect(process.env.DB_MONGOODB_URI, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		socketTimeoutMS: 0,
		keepAlive: true,
		reconnectTries: 5,
	})
	const connection = mongoose.connection
	connection.on('error', console.error.bind(console, 'connection error:'))
	// mongoose.connection.on('error', () => {
	// 	throw new Error(`unable to connect to database: ${config.db}`)s
	// })
	connection.once('close', onClose)
	connection.once('reconnect', onReconnect)
	connection.once('open', onOpen)
}

export default mongooseConfig