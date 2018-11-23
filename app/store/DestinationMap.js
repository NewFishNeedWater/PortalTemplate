
const oConfiguration = require(process.cwd() + '/app/store/Configuration.js');


const DESTINATION_MAP = {
 "default": {
    "Name": "c4c",
    "Type": "HTTP",
    "URL": "https://my304777.crm.ondemand.com/",
    "Authentication": "BasicAuthentication",
    "ProxyType": "Internet",
    "Description": "retrieve data from C4C",
    "User": "ADMINISTRATION01",
    "Password": "Welcome1"
   /*  "URL": "https://a6p-cust206.dev.sapbydesign.com/",
     "User": "CRMOPS",
     "Password": "Ondemand1"*/
  }
};


const ACTIVE_DESINATION = process.env.ACTIVE_DESINATION;


function getActiveProperty(){
  return  oConfiguration.getDestination();
  //return DESTINATION_MAP[ACTIVE_DESINATION] || DESTINATION_MAP.default;
}


module.exports = {

};
