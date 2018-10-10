const c4capi = require(process.cwd() + '/app/utils/c4capi.js'),
    c4cconfig = require(process.cwd() + '/app/config/c4cConfig.js');


function getMetaData (req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
  c4capi.fetchToken(service).then(function(oData) {
      res.send(oData);
  });
}

module.exports = {
    getMetaData
};
