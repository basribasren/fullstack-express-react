var passport = require('passport')
var localPassport = require('passport-local').Strategy

passport.use(
	new localPassport(function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) return done(err)
			if (!user) {
				return done(null, false, {
					message: 'incorect username',
				})
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'incorect password',
				})
			}
			return done(null, user)
		})
	})
)

module.exports = passport
