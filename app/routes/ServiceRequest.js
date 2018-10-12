var express = require('express');
var router = express.Router();

const contactCommunicationHandler = require(process.cwd() + '/app/handler/ContactCommunicationDataHandler.js'),
    serviceRequestHandler = require(process.cwd() + '/app/handler/ServiceRequestDataHandler.js'),
    backEndDataHandler = require(process.cwd() + '/app/handler/BackEndDataHandler.js');


//display index page
router.get('/index', function(req, res) {
    res.render('index');
});

router.get('/getC4CContact',contactCommunicationHandler.getContactCommunicationData);
router.get('/getServicePriorityCode',serviceRequestHandler.getServicePriorityCode);
router.get('/getServiceCategory',serviceRequestHandler.getServiceCategory);
router.get('/getServiceRequestLifeCycleStatusCode',serviceRequestHandler.getServiceRequestLifeCycleStatusCode);
router.get('/getServiceRequestDescription', serviceRequestHandler.getServiceRequestDescription)



module.exports = router;