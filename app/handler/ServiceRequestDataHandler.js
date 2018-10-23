const c4capi = require(process.cwd() + '/app/utils/c4capi.js'),
    url = require("url"),
    c4cconfig = require(process.cwd() + '/app/config/c4cConfig.js');

// GET Service Request Priority code
function getServicePriorityCode (req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestServicePriorityCodeCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

// GET Service Request LifeCycle status code
function getServiceRequestLifeCycleStatusCode (req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestServiceRequestLifeCycleStatusCodeCollection";
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function getProductCollection(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ProductCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function getServiceCategory(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceIssueCategoryCatalogueCategoryCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function getServiceRequests(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
         res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function postServiceRequests(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestCollection";
    var oData =  req.body;
    c4capi.postODataData(service, path, oData).then(function(response) {
        res.status(201).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function patchServiceRequests(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    var oData =  req.body;
    var baseID = oData.baseID;
    oData.baseID = undefined;
    let path = "ServiceRequestCollection('"  + baseID + "')";
    c4capi.updateODataData(service, path, oData).then(function(response) {
        res.status(204).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function postServiceRequestDescription(req, res){
    var oData =  req.body;
    var baseID = oData.baseID;
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    var requestData = {
        TypeCode: "10004",
        AuthorUUID: oData.AuthorUUID,
        Text: oData.Text
    };
    let path = "ServiceRequestCollection('"  + baseID + "')/ServiceRequestDescription";
    c4capi.postODataData(service, path, requestData).then(function(response) {
        res.status(201).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function postServiceRequestAttachment(req, res){
    var oData =  req.body;
    var baseID = oData.baseID;
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    var requestData = {
        Name: oData.Name,
        Binary: oData.Binary
    };
    let path = "ServiceRequestCollection('"  + baseID + "')/ServiceRequestAttachmentFolder";
    c4capi.postODataData(service, path, requestData).then(function(response) {
        res.status(201).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


function getServiceIssueCategoryCatalogueCategory(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceIssueCategoryCatalogueCategoryCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


function getIncidentCategory(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceIssueCategoryCatalogueCategoryCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

function getProduct(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ProductCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


function converstionToOdataParas(req){
    var para = url.parse(req.url, true).query;
    var attr, searchStr, firstFlag = true;
    if(para){
        searchStr = '?';
        for(attr in para){
            if(firstFlag){
                searchStr = searchStr + attr + '=' + para[attr]+'';
                firstFlag = false;
            }else{
                searchStr = searchStr + '&' + attr + '=' + para[attr]+'';
            }
        }
        return searchStr;
    }
}


function getServiceRequestDescription(req, res){

}

module.exports = {
    getServicePriorityCode,
    getServiceRequestLifeCycleStatusCode,
    getServiceCategory,
    getServiceRequestDescription,
    getServiceRequests,
    getServiceIssueCategoryCatalogueCategory,
    getIncidentCategory,
    getProduct,
    getProductCollection,
    patchServiceRequests,
    postServiceRequests,
    postServiceRequestDescription,
    postServiceRequestAttachment
};
