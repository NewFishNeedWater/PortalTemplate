
const request = require('request'),
    oC4cConfig = require(process.cwd() + '/app/config/CloudForCustomerConfig.js');

const requestC = request.defaults({jar: true});


function fetchToken(service, odataName) {// festch x-csrf-token
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization(odataName).then(function (oHostAndAuthorization) {
            requestC({
                url: oHostAndAuthorization.sHost + service + "/$metadata",
                method: "GET",
                json: true,
                headers: {
                    "content-type": "application/json",
                    "x-csrf-token": "fetch",
                    'Authorization': oHostAndAuthorization.sAuthorization
                }
            }, function (error, response, data) {
                var csrfToken = response.headers['x-csrf-token'];

                if (csrfToken) {
                    resolve(csrfToken);
                } else {
                    reject();
                }
            });
        }).catch(function(oEvent){
            reject();
        });
    });
}

function postODataData(service, path, data, odataName) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization(odataName).then(function (oHostAndAuthorization) {
            fetchToken(service, odataName).then(function (csrfToken) {

                requestC({
                    url: oHostAndAuthorization.sHost+service + "/" + path,
                    method: "POST",
                    json: true,
                    body: data,
                    headers: {
                        "content-type": "application/json",
                        'x-csrf-token': csrfToken
                    }
                }, function (error, response, data) {
                    console.log({"error": error});
                    requestEndFunction(error, data, resolve, reject);
                });
            }).catch(function (oEvent) {
                reject();
            });
        }).catch(function(oEvent){
            reject()
        });

    });
}

function fetchODataData(service, path, odataName) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization(odataName).then(function (oHostAndAuthorization) {
                var sUrl;
                if(odataName === "C4CBackEnd"){
                    sUrl = oHostAndAuthorization.sHost + service;
                }else if(odataName === "ECBackEnd"){
                    sUrl = oHostAndAuthorization.sHost + "/" + service;
                }
                console.log(sUrl + "/" + path);
                request({
                    url: sUrl + "/" + path,
                    method: "GET",
                    json: true,
                    headers: {
                        "content-type": "application/json",
                        'Authorization': oHostAndAuthorization.sAuthorization
                    }
                }, function (error, response, data) {
                    console.log({"error": error});
                    requestEndFunction(error, data, resolve, reject);
                });
        }).catch(function(oEvent){
            reject()
        });

    });
}

function updateODataData(service, path, data, odataName) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization(odataName).then(function (oHostAndAuthorization) {
            fetchToken(service, odataName).then(function (csrfToken) {
                requestC({
                    url: oHostAndAuthorization.sHost+service + "/" + path,
                    method: "PATCH",
                    json: true,
                    body: data,
                    headers: {
                        "content-type": "application/json",
                        'x-csrf-token': csrfToken
                    }
                }, function (error, response, data) {
                    requestEndFunction(error, data, resolve, reject);
                });
            }).catch(function () {
                reject();
            });
        }).catch(function(oEvent){
            reject()
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


module.exports = {
    fetchODataData,
    updateODataData,
    postODataData
};