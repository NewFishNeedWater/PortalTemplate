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
router.get('/getServiceRequestDescription', serviceRequestHandler.getServiceRequestDescription);
router.get('/getServiceRequests', serviceRequestHandler.getServiceRequests);
router.get('/getProductCollection', serviceRequestHandler.getProductCollection);
router.post('/postServiceRequests', serviceRequestHandler.postServiceRequests);
router.post('/postServiceRequestDescription', serviceRequestHandler.postServiceRequestDescription);
router.post('/postServiceRequestAttachment', serviceRequestHandler.postServiceRequestAttachment);
router.get('/getServiceIssueCategoryCatalogueCategory',serviceRequestHandler.getServiceIssueCategoryCatalogueCategory);
router.get('/getIncidentCategory',serviceRequestHandler.getIncidentCategory);
router.get('/getProduct',serviceRequestHandler.getProduct);



module.exports = router;