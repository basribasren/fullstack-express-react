import util from 'util'
import redis from 'redis'
import winstonLogger from '@config/winstonConfig.js'

const logger = winstonLogger

/**
 * do not need close connection when error
 * redis will always trying reconnect in background
 * @return {[type]} [description]
 */
const onError = () => {
	logger.error('Connected to Redis failed!', {
		service: 'redis',
		method: null,
	})
	return
}

const onConnect = () => {
	logger.info('Connected to Redis...', {
		service: 'redis',
		method: null,
	})
	return
}

const onMonitor = (time, args) => {
	let message = time + ': ' + util.inspect(args)
	logger.info('Connected to Redis...', {
		service: 'redis',
		method: null,
	})
	return
}

const redisConfig = () => {
	const client = redis.createClient({
		return_buffers: true,
	})
	client.on('error', onError)
	client.once('connect', onConnect)
	client.on('monitor', onMonitor)
	return client
}

export default redisConfig

// // Search processing
// app.post('/user/search', function(req, res, next){
//   let id = req.body.id;

//   client.hgetall(id, function(err, obj){
//     if(!obj){
//       res.render('searchusers', {
//         error: 'User does not exist'
//       });
//     } else {
//       obj.id = id;
//       res.render('details', {
//         user: obj
//       });
//     }
//   });
// });

// // Add User Page
// app.get('/user/add', function(req, res, next){
//   res.render('adduser');
// });

// // Process Add User Page
// app.post('/user/add', function(req, res, next){
//   let id = req.body.id;
//   let first_name = req.body.first_name;
//   let last_name = req.body.last_name;
//   let email = req.body.email;
//   let phone = req.body.phone;

//   client.hmset(id, [
//     'first_name', first_name,
//     'last_name', last_name,
//     'email', email,
//     'phone', phone
//   ], function(err, reply){
//     if(err){
//       console.log(err);
//     }
//     console.log(reply);
//     res.redirect('/');
//   });
// });

// // Delete User
// app.delete('/user/delete/:id', function(req, res, next){
//   client.del(req.params.id);
//   res.redirect('/');
// });














// const respond = (username, repositories) => {
// 	return `Users "${username}" has ${repositories} public repositories.`;
// };

// const getUserRepos = (req, res) => {
// 	let username = req.query.username;
// 	request.get(`https://api.github.com/users/${username}/repos`, function(err, response) {
// 		if (err) throw err;

// 		let repoLength = response.body.length;

// 		client.setex(username, 3600, repoLength);

// 		res.send(respond(username, repoLength));
// 	});
// };

// function cache(req, res, next) {
// 	const username = req.query.username;
// 	client.get(username, function(err, data) {
// 		if (err) throw err;

// 		if (data != null) {
// 			res.send(respond(username, data));
// 		} else {
// 			next();
// 		}
// 	});
// }

// app.get('/users', cache, getUserRepos);

// app.listen(3000, function() {
// 	console.log('node-redis app listening on port 3000!')
// });
