const c4capi = require(process.cwd() + '/app/utils/CloudForCustomerAPI.js'),
    url = require("url"),
    c4cconfig = require(process.cwd() + '/app/config/CloudForCustomerConfig.js');

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

/**
 * Search Service requests
 * @param req
 * @param res
 */
function getServiceRequests(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestCollection";
    let objectID = getObjectIDValue(req);
    if(objectID){
        // In case key value: object id could be retrieved.
        path = path + "("  + objectID + ")";
    }
    let searchPath = converstionToOdataParas(req, ['ObjectID']);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


function getServiceRequestsCount(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestCollection/$count";
    let objectID = getObjectIDValue(req);
    if(objectID){
        // In case key value: object id could be retrieved.
        path = path + "("  + objectID + ")";
    }
    let searchPath = converstionToOdataParas(req, ['ObjectID']);
    if(searchPath){
        path = path + searchPath;
    }
    c4capi.fetchODataData(service, path).then(function(response) {
        if(typeof response === 'object'){
            return res.status(200).send(response);
        }else{
            return res.status(200).send({
                count:response
            });
        }

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
        TypeCode: "10008",
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

/**
 * Utility method to get the specified parameter
 * @param req
 * @param {string} searchParaName specified parameter name
 * @returns {*}
 */
function getSearchPara(req, searchParaName){
    var para = url.parse(req.url, true).query;
    if(para){
        if(para[searchParaName]){
            return para[searchParaName];
        }
    }
}

/**
 * Utility method to get "objectID" value from request
 * @param req
 */
function getObjectIDValue(req){
    var objectIDValue = getSearchPara(req, 'ObjectID');
    if(objectIDValue){
        return objectIDValue;
    }
}

function converstionToOdataParas(req, excludingNameList){
    var para = url.parse(req.url, true).query;
    var attr, searchStr, firstFlag = true;
    if(para){
        searchStr = '?';
        for(attr in para){
            if(excludingNameList && excludingNameList.length > 0){
                if(_containsParaInList(excludingNameList, attr)){
                    continue;
                }
            }
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

function _containsParaInList(excludingNameList, attr){
    if(!excludingNameList || excludingNameList.length === 0){
        return false;
    }
    var i = 0, len =  excludingNameList.length;
    for(var i = 0; i < len; i ++){
        if(attr && attr === excludingNameList[i]){
            return true;
        }
    }
    return false;
}

function getServiceRequestDescription(req, res){

}

module.exports = {
    getServicePriorityCode,
    getServiceRequestLifeCycleStatusCode,
    getServiceCategory,
    getServiceRequestDescription,
    getServiceRequests,
    getServiceRequestsCount,
    getServiceIssueCategoryCatalogueCategory,
    getIncidentCategory,
    getProduct,
    getProductCollection,
    patchServiceRequests,
    postServiceRequests,
    postServiceRequestDescription,
    postServiceRequestAttachment
};
