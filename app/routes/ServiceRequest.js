var express = require('express');
var router = express.Router();

const c4cBackEndHandler = require(process.cwd() + '/app/handler/ContactCommunicationDataHandler.js');

//display index page
router.get('/index', function(req, res) {
    res.render('index');
});

router.get('/getC4CContact',c4cBackEndHandler.getContactCommunicationData);


module.exports = router;