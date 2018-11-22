const request = require('request');

function mapDestination() {

    this.getDestinationInfo = function () {
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
    };

    this.getAccessToken = function () {
        var oDestination = this.getDestinationInfo();
        console.log(oDestination);
        if (!oDestination) {
            return Promise.reject();
        }

        return new Promise(function (resolve, reject) {
            let options = {
                url: oDestination.credentials.url + '/oauth/token',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    'Authorization': 'Basic ' + new Buffer(oDestination.credentials.clientid + ":" + oDestination.credentials.clientsecret).toString('base64')
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
    };

    this.getDestination = function (token) {
        let oDestination = this.getDestinationInfo();
        console.log(token);
        if (!token) {
            return null;
        }

        return new Promise(function (resolve, reject) {
            let options = {
                url: oDestination.credentials.uri + '/destination-configuration/v1/instanceDestinations',
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

    };


    this.getDestinationSync = async function () {

        return await this.getDestination4App();
    };

    this.getDestination4App = function () {
        let that = this;
        return new Promise(function (resolve, reject) {
            that.getAccessToken().then(function (token) {

                that.getDestination(token).then(function (oDestination) {

                    resolve(oDestination);
                });
            });
        });

    };


}

module.exports = mapDestination;
