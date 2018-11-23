const oC4cAPI = require(process.cwd() + '/app/utils/CloudForCustomerAPI.js'),
    oC4cConfig = require(process.cwd() + '/app/config/CloudForCustomerConfig.js'),
    url = require("url");

const service = 'c4codata';
/**
 * @public GET Service Request Priority code
 * @param req
 * @param res
 */
function getServicePriorityCode (req, res){


    let path = "ServiceRequestServicePriorityCodeCollection";
    let searchPath = converstionToOdataParas(req);
    if (searchPath) {
        path = path + searchPath;
    }
    oC4cAPI.fetchODataData(service, path).then(function (response) {
        res.status(200).send(response);
    }).catch(function (reason) {
        res.send(reason);
    });



}


/**
 * @public GET Service Request LifeCycle status code
 * @param req
 * @param res
 */
function getServiceRequestLifeCycleStatusCode (req, res){
    let path = "ServiceRequestServiceRequestLifeCycleStatusCodeCollection";
    oC4cAPI.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

/**
 * @public  get products from C4C
 * @param req
 * @param res
 */
function getProducts(req, res){
    let path = "ProductCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    oC4cAPI.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

/**
 * @public get service category from C4C, or get incident category with parent ID & type code.
 * @param req
 * @param res
 */
function getServiceCategory(req, res){
    let path = "ServiceIssueCategoryCatalogueCategoryCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    oC4cAPI.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

/**
 * @public get Service requests from C4C
 * @param req
 * @param res
 */
function getServiceRequests(req, res){
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
    oC4cAPI.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


/**
 * @public get count of service requests from C4C
 * @param req
 * @param res
 */
function getServiceRequestsCount(req, res){
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
    oC4cAPI.fetchODataData(service, path).then(function(response) {
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


/**
 * @public create service request to C4C
 * @param req
 * @param res
 */
function postServiceRequests(req, res){
    let path = "ServiceRequestCollection";
    var oData =  req.body;


    //set the channel to 'internet'
    oData.DataOriginTypeCode = '4';
    oC4cAPI.postODataData(service, path, oData).then(function(response) {
        res.status(201).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

/**
 * @public edit service request and sync to C4C
 * @param req
 * @param res
 */
function patchServiceRequests(req, res){
    var oData =  req.body;
    var baseID = oData.baseID;
    oData.baseID = undefined;
    let path = "ServiceRequestCollection('"  + baseID + "')";
    oC4cAPI.updateODataData(service, path, oData).then(function(response) {
        res.status(204).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

/**
 * @public create service request description to C4C
 * @param req
 * @param res
 */
function postServiceRequestDescription(req, res){
    var oData =  req.body;
    var baseID = oData.baseID;
    var requestData = {
        TypeCode: "10008",
        AuthorUUID: oData.AuthorUUID,
        Text: oData.Text
    };
    let path = "ServiceRequestCollection('"  + baseID + "')/ServiceRequestDescription";
    oC4cAPI.postODataData(service, path, requestData).then(function(response) {
        res.status(201).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}

/**
 * @public upload attachment to service request
 * @param req
 * @param res
 */
function postServiceRequestAttachment(req, res){
    var oData =  req.body;
    var baseID = oData.baseID;
    var requestData = {
        Name: oData.Name,
        Binary: oData.Binary
    };
    let path = "ServiceRequestCollection('"  + baseID + "')/ServiceRequestAttachmentFolder";
    oC4cAPI.postODataData(service, path, requestData).then(function(response) {
        res.status(201).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


/**
 * @public get Service Issue Category Catalogue Category
 * @param req
 * @param res
 */
function getServiceIssueCategoryCatalogueCategory(req, res){
    let path = "ServiceIssueCategoryCatalogueCategoryCollection";
    let searchPath = converstionToOdataParas(req);
    if(searchPath){
        path = path + searchPath;
    }
    oC4cAPI.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    }).catch(function(reason){
        res.send(reason);
    });
}


/**
 * @private Utility method to get the specified parameter
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
 * @private Utility method to get "objectID" value from request
 * @param req
 */
function getObjectIDValue(req){
    var objectIDValue = getSearchPara(req, 'ObjectID');
    if(objectIDValue){
        return objectIDValue;
    }
}

/**
 * @private Utility method that convert request to odata params
 * @param req
 * @param excludingNameList
 * @returns {string}
 */
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

/**
 * @private
 * @param excludingNameList
 * @param attr
 * @returns {boolean}
 * @private
 */
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


module.exports = {
    getServicePriorityCode,
    getServiceRequestLifeCycleStatusCode,
    getServiceCategory,
    getServiceRequests,
    getServiceRequestsCount,
    getServiceIssueCategoryCatalogueCategory,
    getProducts,
    patchServiceRequests,
    postServiceRequests,
    postServiceRequestDescription,
    postServiceRequestAttachment
};
