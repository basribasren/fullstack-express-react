module.exports = function(mongoose) {
	mongoose.connect(process.env.DB_MONGOODB_URI, {
		useNewUrlParser: true,
		socketTimeoutMS: 0,
		keepAlive: true,
		reconnectTries: 30,
	})
	const connection = mongoose.connection
	connection.on('error', console.error.bind(console, 'connection error:'))
	connection.once('open', function() {
		console.log('Successfully connected to database')
	})
}
