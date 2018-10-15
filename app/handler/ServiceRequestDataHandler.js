const c4capi = require(process.cwd() + '/app/utils/c4capi.js'),
    url = require("url"),
    c4cconfig = require(process.cwd() + '/app/config/c4cConfig.js');

// GET Service Request Priority code
function getServicePriorityCode (req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestServicePriorityCodeCollection";
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    });
}

// GET Service Request LifeCycle status code
function getServiceRequestLifeCycleStatusCode (req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceRequestServiceRequestLifeCycleStatusCodeCollection";
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
    });
}

function getServiceCategory(req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ServiceIssueCategoryCatalogueCategoryCollection";
    c4capi.fetchODataData(service, path).then(function(response) {
        res.status(200).send(response);
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
    });
}

function converstionToOdataParas(req){
    var para = url.parse(req.url, true).query;
    var attr, searchStr, firstFlag = true;
    if(para){
        searchStr = '?';
        for(attr in para){
            if(firstFlag){
                searchStr = searchStr + attr + '=' + para[attr];
                firstFlag = false;
            }else{
                searchStr = searchStr + '&' + attr + '=' + para[attr];
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
    getServiceRequests

};
