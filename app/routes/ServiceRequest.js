var express = require('express');
var router = express.Router();

const contactCommunicationHandler = require(process.cwd() + '/app/handler/ContactCommunicationDataHandler.js'),
    serviceRequestHandler = require(process.cwd() + '/app/handler/ServiceRequestDataHandler.js');


router.get('/getC4CContact',contactCommunicationHandler.getContactCommunicationData);
router.get('/getServicePriorityCode',serviceRequestHandler.getServicePriorityCode);
router.get('/getServiceRequestLifeCycleStatusCode',serviceRequestHandler.getServiceRequestLifeCycleStatusCode);
router.get('/getServiceRequestDescription', serviceRequestHandler.getServiceRequestDescription);
router.get('/getServiceRequestsCount', serviceRequestHandler.getServiceRequestsCount);
router.get('/getServiceRequests', serviceRequestHandler.getServiceRequests);
router.get('/getServiceIssueCategoryCatalogueCategory',serviceRequestHandler.getServiceIssueCategoryCatalogueCategory);

//the same handler for both incident category & service category
router.get('/getIncidentCategory',serviceRequestHandler.getServiceCategory);
router.get('/getServiceCategory',serviceRequestHandler.getServiceCategory);

router.get('/getProducts',serviceRequestHandler.getProducts);
router.post('/postServiceRequests', serviceRequestHandler.postServiceRequests);
router.post('/postServiceRequestDescription', serviceRequestHandler.postServiceRequestDescription);
router.post('/postServiceRequestAttachment', serviceRequestHandler.postServiceRequestAttachment);
router.patch('/patchServiceRequests', serviceRequestHandler.patchServiceRequests);


module.exports = router;