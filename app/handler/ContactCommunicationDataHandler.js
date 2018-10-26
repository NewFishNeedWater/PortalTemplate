const c4capi = require(process.cwd() + '/app/utils/c4capi.js'),
    c4cconfig = require(process.cwd() + '/app/config/c4cConfig.js');

// read contact communication data
function getContactCommunicationData (req, res){
    let service = c4cconfig.BYD_ODATA + 'c4codata';
    let path = "ContactCommunicationDataCollection?$format=json&$expand=AccountContactRelationship&$filter=EMail eq %27" + req.query.userEmail + "%27";
  c4capi.fetchODataData(service, path).then(function(oContactCommunicationData) {
      if(oContactCommunicationData.length>0){
          //res.status(200).send(null);
          let sUUID = oContactCommunicationData[0].AccountContactRelationship ? oContactCommunicationData[0].AccountContactRelationship.ContactUUID : '';
          let service = c4cconfig.BYD_ODATA + 'c4codata';
          let path = "ContactCollection?$format=json&$filter=ObjectID eq %27" + sUUID.split("-").join("") + "%27";
          c4capi.fetchODataData(service,path).then(function(oContact){
              res.status(200).send(oContact);
          }).catch(function(reason){
              res.send(reason);
          });
      }else{
          res.status(200).send(null);
      }
  });
}

module.exports = {
    getContactCommunicationData
};
