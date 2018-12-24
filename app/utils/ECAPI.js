/** 
 * add API file to get EC token
*/
const request = require('request'),
oC4cConfig = require(process.cwd() + '/app/config/CloudForCustomerConfig.js');
const requestC = request.defaults({jar: true});

function getAccessToken() {

    var sUrl = "https://sap-cec-ec-prod-security-service.cfapps.eu10.hana.ondemand.com/v1/security/access-token";
    let odataName = "ECBackEnd";
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization(odataName).then(function (oHostAndAuthorization) {
            requestC({
                url: sUrl,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                    "accept" : "application/json",
                    'Authorization': oHostAndAuthorization.sAuthorization
                },
                form:{
                    "subdomain": "wechatfra" 
                }
            }, function (error, response, data) {
                var accessToken = data.access_token;
                if (accessToken) {
                    resolve(accessToken);
                } else {
                    reject();
                }
            });
        }).catch(function(oEvent){
            reject();
        });
    });
}

function requestEndFunction(error, data, resolve, reject) {
    if (error) {
        reject(error);
    }
    if (data && data.d && data.d.results) {
        resolve(data.d.results);
    } else {
        resolve(data);
    }
}


function fetchODataDataForEC(service, path, odataName) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization(odataName).then(function (oHostAndAuthorization) {
                getAccessToken().then(function (token) {
                    var sUrl = oHostAndAuthorization.sHost + "/" + service;
                    request({
                        url: sUrl + "/" + path,
                        method: "GET",
                        json: true,
                        headers: {
                            "content-type": "application/json",
                            "Authorization": "Bearer " + token
                        }
                    }, function (error, response, data) {
                        console.log({"error": error});
                        requestEndFunction(error, data, resolve, reject);
                    });
                }).catch(function(oError){
                    reject({'error':oError});
                });
        }).catch(function(oEvent){
            reject()
        });

    });
}


module.exports = {
    fetchODataDataForEC
};