const destination = require(process.cwd() + '/app/store/Destination.js');

const DESTINATION_MAP = {
 "default": {
    "Name": "c4c",
    "Type": "HTTP",
    "URL": "https://my306768.vlab.sapbydesign.com/",
    "Authentication": "BasicAuthentication",
    "ProxyType": "Internet",
    "Description": "retrieve data from C4C",
    "User": "crmops",
    "Password": "Ondemand1"
  }
};


const ACTIVE_DESINATION = process.env.ACTIVE_DESINATION;

function getActiveProperty(){
  return DESTINATION_MAP[ACTIVE_DESINATION] || DESTINATION_MAP.default;
}

function setProperty(host,key,value){
  DESTINATION_MAP[host][key] = value;
}

function setDest(host,value){
  DESTINATION_MAP[host] = value;
}

function getAll(){
  return DESTINATION_MAP;
}

module.exports = {
  getActiveProperty,
  setProperty,
  setDest,
  getAll
};
