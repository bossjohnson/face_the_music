var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});
router.get('/test', function(req, res, next){
    
});
module.exports = router;
