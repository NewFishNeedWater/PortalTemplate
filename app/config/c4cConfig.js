
const DESTINATION_MAP = require(process.cwd() + '/app/store/DesinationMap.js');

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
    BYD_ODATA: HOST() + "/sap/byd/odata/v1/",
    AUTHORIZATION: AUTHORIZATION()
}
