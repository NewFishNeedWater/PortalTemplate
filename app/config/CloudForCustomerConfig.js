
const configurationService = require(process.cwd() + '/app/store/Configuration.js');
const oHostAndAuthorization = {};

const sURLFix= "/sap/byd/odata/v1/";

const getHostAndAuthorization = () => {

    return new Promise(function (resolve, reject) {

        configurationService.getDestination().then(function(oDest){

            if(oDest.destinationConfiguration
                && oDest.destinationConfiguration.URL
                && oDest.destinationConfiguration.User
                && oDest.destinationConfiguration.Password
            ){
                oHostAndAuthorization.sHost= oDest.destinationConfiguration.URL + sURLFix;
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
