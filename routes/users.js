var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('statistics', { user : req.user });
});

module.exports = router;
