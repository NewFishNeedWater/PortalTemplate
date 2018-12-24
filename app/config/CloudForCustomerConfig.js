
const configurationService = require(process.cwd() + '/app/store/Configuration.js');
const oHostAndAuthorization = {};

const sURLFix= "/sap/byd/odata/v1/";

const getHostAndAuthorization = (odataName) => {

    return new Promise(function (resolve, reject) {

        configurationService.getDestination(odataName).then(function(oDest){

            if(oDest.destinationConfiguration
                && oDest.destinationConfiguration.URL
                && oDest.destinationConfiguration.User
                && oDest.destinationConfiguration.Password
            ){
                if(odataName === "C4CBackEnd"){
                    oHostAndAuthorization.sHost= oDest.destinationConfiguration.URL + sURLFix;
                }else if(odataName === "ECBackEnd"){
                    oHostAndAuthorization.sHost= oDest.destinationConfiguration.URL;
                }
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
