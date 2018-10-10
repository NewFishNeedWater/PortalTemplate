var express = require('express');
var router = express.Router();

const contactCommunicationHandler = require(process.cwd() + '/app/handler/ContactCommunicationDataHandler.js'),
    backEndDataHandler = require(process.cwd() + '/app/handler/BackEndDataHandler.js');


//display index page
router.get('/index', function(req, res) {
    res.render('index');
});

router.get('/getC4CContact',contactCommunicationHandler.getContactCommunicationData);



module.exports = router;