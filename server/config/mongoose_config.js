const onClose = () => {
	console.log('MongoDB connection was closed')
}

const onReconnect = () => {
	console.log('MongoDB reconnected')
}

const onOpen = () => {
	console.log('Successfully connected to database')
}

const mongoose_setting = mongoose => {
	mongoose.connect(process.env.DB_MONGOODB_URI, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		socketTimeoutMS: 0,
		keepAlive: true,
		reconnectTries: 30,
	})
	const connection = mongoose.connection
	connection.on('error', console.error.bind(console, 'connection error:'))
	connection.once('close', onClose)
	connection.once('reconnect', onReconnect)
	connection.once('open', onOpen)
}
export default mongoose_setting
