var csrf = require('csurf');

module.exports = function(req, res, next){
	var csrfProtection = csrf({ cookie: true });
	var csrfToken =  req.csrfToken();
};