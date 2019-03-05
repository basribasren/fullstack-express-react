var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

module.exports = function(req, res, next){
	if (cluster.isMaster) {
		console.log('Master $process.pid} is running');
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
		cluster.on('exit', function(worker, code, signal){
			console.log('worker ${worker.process.pid} died');
		});

	}else{
		console.log('Worker ${process.pid} started');
		next();
	}
};