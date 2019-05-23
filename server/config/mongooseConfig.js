import chalk from 'chalk'

const onClose = () => {
	console.info(chalk.yellow('MongoDB connection was closed'))
	// console.log('MongoDB connection was closed')
}

const onReconnect = () => {
	console.log('MongoDB reconnected')
}

const onOpen = () => {
	console.log(chalk.green('Successfully connected to database'))
	// console.log('Successfully connected to database')
}

const onError = (err) => {
	console.error(chalk.red('Connection Error: Could not connect to MongoDB!'))
	// console.log('Connection Error' + err)
}

const mongooseConfig = mongoose => {
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
	connection.once('close', onClose)
	connection.once('reconnect', onReconnect)
	connection.once('open', onOpen)
}
export default mongooseConfig
