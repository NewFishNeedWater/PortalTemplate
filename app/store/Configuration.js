
const destination = require(process.cwd() + '/app/store/Destination.js');
const oDestinationParent = {};

function saveDestination(oDest){
    oDestinationParent.oDestination =oDest;
}

function getDestination(odataName){

    if(oDestinationParent.oDestination){
        return new Promise(function (resolve, reject) {
            if(oDestinationParent.oDestination){
                resolve(oDestinationParent.oDestination);
            }else{
                reject();
            }

        });
    }else{
        return new Promise(function (resolve, reject) {
            destination.getDestination4App(odataName).then(function(oDestination){
                if(oDestination){
                    saveDestination(oDestination);
                    resolve(oDestination);
                }else{
                    reject();
                }

            }).catch(function(oEvent){
                reject();
            });
        });
    }


}

module.exports = {
    getDestination
};