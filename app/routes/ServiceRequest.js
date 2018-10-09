var express = require('express');
var router = express.Router();


router.get('/getCollection', function(req, res) {

  let oItems = [
      {name: 'JoeyTest', location : 'testtest'},
      {name: 'JoeyTest11', location : 'testtest11'},
  ];
  res.send(oItems);
});

router.get('/index', function(req, res, next) {

    res.render('index');

});




module.exports = router;
