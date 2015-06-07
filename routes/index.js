var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var message = "<center><h1>JYM Frontier is currently still in development progress</h1>  <h3>More information will be coming soon</h3></center>"
    res.send(message);
});

router.get('*', function(req, res){
    var message = "<center><h1>This page has not been built yet</h1>  <h3>Please stay tuned</h3></center>"
    res.send(message);
})



module.exports = router;
