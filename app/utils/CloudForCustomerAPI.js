
const request = require('request'),
    oC4cConfig = require(process.cwd() + '/app/config/CloudForCustomerConfig.js');

const requestC = request.defaults({jar: true});


function fetchToken(service) {// festch x-csrf-token
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization().then(function (oHostAndAuthorization) {
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
                console.log(csrfToken);
                console.log(error);
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

function postODataData(service, path, data) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization().then(function (oHostAndAuthorization) {
            fetchToken(service).then(function (csrfToken) {
                console.log(oHostAndAuthorization.sHost+service + "/" + path);
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

function fetchODataData(service, path) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization().then(function (oHostAndAuthorization) {
                request({
                    url: oHostAndAuthorization.sHost+service + "/" + path,
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

function updateODataData(service, path, data) {
    return new Promise(function (resolve, reject) {
        oC4cConfig.getHostAndAuthorization().then(function (oHostAndAuthorization) {
            fetchToken(service).then(function (csrfToken) {
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
                    console.log({"error": error});
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