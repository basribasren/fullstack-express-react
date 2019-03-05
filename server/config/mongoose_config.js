var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(process.env.DB_MONGOODB_URI, {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
});

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log('Successfully connected to database');
});

module.exports = connection;
