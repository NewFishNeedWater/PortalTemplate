const oC4cAPI = require(process.cwd() + '/app/utils/CloudForCustomerAPI.js'),
    oC4cConfig = require(process.cwd() + '/app/config/CloudForCustomerConfig.js');


/**
 * @public read contact communication data from C4C
 * @param req
 * @param res
 */
function getContactCommunicationData (req, res){
    let service = oC4cConfig.BYD_ODATA + 'c4codata';
    let path = "ContactCommunicationDataCollection?$format=json&$expand=AccountContactRelationship&$filter=EMail eq %27" + req.query.userEmail + "%27";
    oC4cAPI.fetchODataData(service, path).then(function(oContactCommunicationData) {
      if(oContactCommunicationData.length>0){
          //res.status(200).send(null);
          let sUUID = oContactCommunicationData[0].AccountContactRelationship ? oContactCommunicationData[0].AccountContactRelationship.ContactUUID : '';
          let service = oC4cConfig.BYD_ODATA + 'c4codata';
          let path = "ContactCollection?$format=json&$filter=ObjectID eq %27" + sUUID.split("-").join("") + "%27";
          oC4cAPI.fetchODataData(service,path).then(function(oContact){
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
