
const configurationService = require(process.cwd() + '/app/store/Configuration.js');
const oHostAndAuthorization = {};

const getHostAndAuthorization = () => {

    return new Promise(function (resolve, reject) {

        configurationService.getDestination().then(function(oDest){

            if(oDest.destinationConfiguration
                && oDest.destinationConfiguration.URL
                && oDest.destinationConfiguration.User
                && oDest.destinationConfiguration.Password
            ){
                oHostAndAuthorization.sHost= oDest.destinationConfiguration.URL;
                oHostAndAuthorization.sAuthorization = 'Basic ' + new Buffer(oDest.destinationConfiguration.User + ":" +
                    oDest.destinationConfiguration.Password).toString('base64');
                resolve(oHostAndAuthorization);
            }else{
                reject();
            }
        }).catch(function(oEvent){
            reject();
        });

    });

};

module.exports = {
    getHostAndAuthorization
};
