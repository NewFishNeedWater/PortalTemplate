const request = require('request');



function getDestinationInfo(){
        let target = null;
        if (process.env.VCAP_SERVICES) {
            let service_info = JSON.parse(process.env.VCAP_SERVICES);
            if (service_info.destination) {
                for (let i = 0; i < service_info.destination.length; i++) {
                    if (service_info.destination[i].instance_name = 'C4CBackEnd') {
                        target = service_info.destination[i];
                        break;
                    }
                }
            }
        }
        return target;
}

function getAccessToken() {
    console.log('Enter: getAccessToken');
        var oDestination = getDestinationInfo();
        console.log('oDestination' + oDestination);
        if (!oDestination) {
            return Promise.reject();
        }

        console.log('oDestination.credentials:' + oDestination.credentials);

        console.log('Base64:' + Buffer.from(oDestination.credentials.clientid + ":" + oDestination.credentials.clientsecret).toString('base64'))

        return new Promise(function (resolve, reject) {
            let options = {
                url: oDestination.credentials.url + '/oauth/token',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    'Authorization': 'Basic ' +  Buffer.from(oDestination.credentials.clientid + ":" + oDestination.credentials.clientsecret).toString('base64')
                },
                form: {
                    client_id: oDestination.credentials.clientid,
                    grant_type: 'client_credentials'
                }
            };
            console.log(options);
            request(options, function (error, response, data) {
                console.log(data);
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
            url: oDestination.credentials.uri + '/destination-configuration/v1/destinations/C4CBackEnd',
            method: "GET",
            json: true,
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        };
        request(options, function (error, response, data) {
            if (data) {
                console.log('getDestionation: success:' + data);
                resolve(data);
            } else {
                console.log('getDestionation: reject:' + data);
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
                    for(var attr in oDestination){
                        console.log('attr:' + attr);
                        console.log('oDestination[attr]' + oDestination[attr]);
                    }
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
