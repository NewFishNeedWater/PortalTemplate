const request = require('request');
const xsenv = require('@sap/xsenv');



function getDestinationInfo(){
       /* let target = null;

        if (process.env.VCAP_SERVICES) {
            console.log("Services: " + process.env.VCAP_SERVICES);
            let service_info = JSON.parse(process.env.VCAP_SERVICES);
            console.log("destinationssssss : " + service_info.destination.length);
            if (service_info.destination) {
                for (let i = 0; i < service_info.destination.length; i++) {
                    if (service_info.destination[i].instance_name === 'C4CBackEnd') {
                        target = service_info.destination[i];
                        console.log("target : " + target);
                        break;
                    }
                }
            }
        }
        return target;*/
    var _matchesDestination = function (service) {
        "use strict";
        return _matches(service, "destination");
    };
    return xsenv.getServices({
        "destination": _matchesDestination
    }).destination;

}

function getXSUAAInfo() {
    var _matchesXSUAA = function (service) {
        "use strict";
        return _matches(service, "xsuaa");
    };
    return xsenv.getServices({
        "xsuaa": _matchesXSUAA
    }).xsuaa;
}

function _matches(serviceObj, serviceName) {
    "use strict";
    if (serviceObj.tags && serviceObj.tags.indexOf(serviceName) > -1) {
        return true;
    }
    else if (serviceObj.label === "user-provided" && serviceObj.credentials.tags && serviceObj.credentials.tags.indexOf(serviceName) > -1) {
        return true;
    }
    return false;
}

function getAccessToken() {

        var oDestination = getDestinationInfo();

        if (!oDestination) {
            return Promise.reject();
        }

        return new Promise(function (resolve, reject) {
            let options = {
                url: oDestination.url + '/oauth/token',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    'Authorization': 'Basic ' +  Buffer.from(oDestination.clientid + ":" + oDestination.clientsecret).toString('base64')
                },
                form: {
                    client_id: oDestination.clientid,
                    grant_type: 'client_credentials'
                }
            };

            request(options, function (error, response, data) {

                if (data && data.access_token) {
                    resolve(data.access_token);
                } else {
                    reject()
                }

            });
        });
}

function getDestination(token) {
    let oDestination = getDestinationInfo();
    console.log('token:' + token);
    if (!token) {
        return null;
    }

    return new Promise(function (resolve, reject) {
        let options = {
            url: oDestination.uri + '/destination-configuration/v1/destinations/C4CBackEnd',
            method: "GET",
            json: true,
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        };
        request(options, function (error, response, data) {
            if (data) {

                resolve(data);
            } else {

                reject()
            }

        });
    });
}


function getDestination4App() {
        console.log('Enter: getDestination4App');
        return new Promise(function (resolve, reject) {
            getAccessToken().then(function (token) {
                getDestination(token).then(function (oDestination) {

                    resolve(oDestination);

                }).catch(function(oError){
                    reject({'error':oError});
                });
            }).catch(function(oError){
                reject({'error':oError});
            });
        });

}

module.exports = {
    getDestination4App
};
