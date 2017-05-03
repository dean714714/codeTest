var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '333' });
});

router.post('/', function(req, res, next) {
	var yonghu = req.body.yonghu;
	var xingbie = req.body.xingbie;
	var geyan = req.body.geyan;
	var newuser = new User({
		yonghu : yonghu,
		xingbie : xingbie,
		geyan : geyan
	});
	newuser.save(function(err,user){
		 res.send(user);
	});
	
});

module.exports = router;
