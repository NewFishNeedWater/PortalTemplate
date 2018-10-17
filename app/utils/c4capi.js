var request = require('request'),
    c4cconfig = require(process.cwd() + '/app/config/c4cConfig.js');
var parseString = require('xml2js').parseString;

var requestC = request.defaults({jar: true});

function fetchToken(service){// festch x-csrf-token
  return new Promise(function(resolve,reject){
    requestC({
      url: service + "/$metadata",
      method: "GET",
      json:true,
      headers: {
         "content-type": "application/json",
         "x-csrf-token" :"fetch",
         'Authorization': c4cconfig.AUTHORIZATION
      }
    },function(error,response,data){
        var csrfToken = response.headers['x-csrf-token']
        console.log(csrfToken);
        console.log(error);
        if(csrfToken){
          resolve(csrfToken);
        }else{
          reject();
        }
    });
  });
};

function postODataData(service,path,data){
  return new Promise(function(resolve,reject){
    fetchToken(service).then(function(csrfToken){
      console.log(service + "/" + path);
      requestC({
        url : service + "/" + path,
        method : "POST",
        json : true,
        body : data,
        headers : {
           "content-type": "application/json",
           'x-csrf-token': csrfToken
        }
      },function(error,response,data){
        console.log({"error":error});
        requestEndfunction(error,data,resolve,reject);
      });
    }).catch(function(){
        reject();
    });
  });
};

function fetchODataData(service,path){
  return new Promise(function(resolve,reject){
    request({
      url: service + "/" + path,
      method: "GET",
      json:true,
      headers: {
         "content-type": "application/json",
         'Authorization': c4cconfig.AUTHORIZATION
      }
    },function(error,response,data){
      console.log({"error":error});
      requestEndfunction(error,data,resolve,reject);
    });
  });
};

function updateODataData(service,path,data){
  return new Promise(function(resolve,reject){
    fetchToken(service).then(function(csrfToken){
      requestC({
        url : service + "/" + path,
        method : "PATCH",
        json : true,
        body : data,
        headers : {
           "content-type": "application/json",
           'x-csrf-token': csrfToken
        }
      },function(error,response,data){
        console.log({"error":error});
        requestEndfunction(error,data,resolve,reject);
      });
    }).catch(function(){
        reject();
    });
  });
};

function requestEndfunction(error,data,resolve,reject){
    if(error){
      reject(error);
    }
    if(data && data.d && data.d.results){
      resolve(data.d.results);
    }else {
      resolve(data);
    }
};

/**
 * Posting data to C4C by Standard Ajax
 * @param {string} url
 * @param {object} data
 * @param {object} oSettings
 *         --{function} success
 *         --{function} error
 *         --{function} complete
 *
 *
 */
function postData(url, data, oSettings){
    jQuery.ajax({
        url: url,
        method: "POST",
        contentType: "application/json",
        headers: {
            "X-CSRF-TOKEN": token
        },
        data: JSON.stringify({
            TypeCode: "10008",
            AuthorUUID: authorUUID,
            Text: text
        }),
        success: function() {
            this.getModel().refresh();
        }.bind(this),
        error: function(jqXHR) {
            var error = jqXHR.responseJSON.error.message.value;
            MessageBox.error(error);
        },
        complete: function() {
            this.app.setBusy(false);
        }.bind(this)
    });
};

module.exports = {
    fetchODataData,
    fetchToken,
    postData,
    postODataData
}