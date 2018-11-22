const DESTINATION_MAP = require(process.cwd() + '/app/store/DestinationMap.js');
const destination = require(process.cwd() + '/app/store/Destination.js');

const HOST = () => {
    const oDest = DESTINATION_MAP.getActiveProperty();
    console.log('oDest: ' + oDest);
    if (oDest && oDest.destinationConfiguration && oDest.destinationConfiguration.URL) {
        return oDest.destinationConfiguration.URL;
    }

};

const AUTHORIZATION = () => {
    const oDest = DESTINATION_MAP.getActiveProperty();
    console.log('oDest: ' + oDest);
    //const user = process.env.userName || oDest.User;
    //const password = process.env.password || oDest.Password;
    if (oDest && oDest.destinationConfiguration && oDest.destinationConfiguration.User) {
        return 'Basic ' + new Buffer(oDest.destinationConfiguration.User + ":" + oDest.destinationConfiguration.Password).toString('base64');
    }

};


module.exports = {
    HOST: HOST(),
    BYD_ODATA: HOST() + "/sap/byd/odata/v1/",
    AUTHORIZATION: AUTHORIZATION()
};
