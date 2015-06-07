var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res) {
//  res.render('index', { title: 'Express' });
    res.sendfile('public/admin.html');
});

module.exports = router;