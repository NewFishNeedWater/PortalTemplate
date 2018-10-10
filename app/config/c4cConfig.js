
const DESTINATION_MAP = require(process.cwd() + '/app/store/desination_map.js');

const HOST = ()=>{
  const oDest = DESTINATION_MAP.getActiveProperty();
  return oDest.URL;
};
const AUTHORIZATION = ()=> {
  const oDest = DESTINATION_MAP.getActiveProperty();
  const user = process.env.userName || oDest.User;
  const password = process.env.password || oDest.Password;
  return 'Basic ' + new Buffer(oDest.User + ":" + oDest.Password).toString('base64');
};


module.exports =  {
    HOST: HOST(),
    ODATA: HOST() + "/sap/c4c/odata/v1/",
    CUST_ODATA: HOST() + "/sap/c4c/odata/cust/v1/",
    BYD_ODATA: HOST() + "/sap/byd/odata/v1/",
    AUTHORIZATION: AUTHORIZATION()
}
