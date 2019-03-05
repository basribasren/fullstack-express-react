var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var publicArticelService = require('../service/service_articel');

//home page get list articel sort by created_at
router.get('/', csrfProtection, function(req, res, next){
	publicArticelService.getListArticelPublic(function(err, listArticel){
		if(err){
			return res.send({ message : err.message });
		}
		else{
			return res.send({listArticel: listArticel});
		}
	});
});

//home page get view one articel
router.get('/:id_articel', csrfProtection, function(req, res, next){
	var  id_articel = req.params.id_articel;		
	publicArticelService.getViewArticelPublic(id_articel, function(err, articel){
		if(err){
			return res.send({ message : err.message });
		}
		else{
			return res.send({articel: articel});
		}
	});
});

//home page get list of who bookmark articel as pop-up
router.get('/:id_articel/listbookmark', csrfProtection, function(req, res, next){
	var id_articel = req.params.id_articel;		
	publicArticelService.getListBookmarkPublic(id_articel, function(err, bookmarker){
		if(err){
			return res.send({ message : err.message });
		}
		else{
			return res.send({bookmarker: bookmarker});
		}
	});
});

//home page get list of who like articel as pop-up
router.get('/:id_articel/listlike', csrfProtection, function(req, res, next){
	var id_articel = req.params.id_articel;		
	publicArticelService.getListLikePublic(id_articel, function(err, liker){
		if(err){
			return res.send({ message : err.message });
		}
		else{
			return res.send({liker: liker});
		}
	});
});

//home page get list of who share articel as pop-up
router.get('/:id_articel/listshare', csrfProtection, function(req, res, next){
	var id_articel = req.params.id_articel;		
	publicArticelService.getListSharePublic(id_articel, function(err, sharer){
		if(err){
			return res.send({ message : err.message });
		}
		else{
			return res.send({sharer: sharer});
		}
	});
});

//home page post search by title or tag result as list artiel
router.post('/', csrfProtection, function(req, res, next){
	var data = {
		search : req.body.serch_input,
		type : req.body.search_by
	};
	publicArticelService.postSearchArticelPublic(data, function(err, listArticel){
		if(err){
			return res.send({ message : err.message });
		}
		else{
			return res.send({listArticel: listArticel});
		}
	});
});

module.exports = router;