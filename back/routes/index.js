var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/article', function(req, res, next) {
  res.send("This is article")
});

module.exports = router;
