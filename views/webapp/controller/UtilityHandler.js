sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/FilterOperator"
], function (UI5Object, FilterOperator) {
    "use strict";

    return UI5Object.extend("ServiceRequests.controller.UtilityHandler", {

        /**
         * Utility method: Read data from server and render oModel
         * @param {JSONModel}oModel
         * @param {string}baseURL
         * @param {object}oSettings
         *         ----{function} success: success call back method
         *         ----{function} error: error call back method
         *         ----{array} filters: filter table
         */
         oModelRead: function(oModel, baseURL, oSettings ){
             var url = baseURL;
             if(this._checkURLWithCondition(oSettings)){
                 url = url + "?";
             }
             if(oSettings.filters){
                 // In case need to add filter conditions
                 url = this._setURLByFilters(url, oSettings.filters);
             }
            $.ajax({
                url:url,
                type:'GET',
                beforeSend: function(request) {
                    //request.setRequestHeader("Authorization", chatbotAPI.nlAPIToken);
                    request.setRequestHeader("Type", "application/json");
                },
                dataType:'json',
            }).done(function(data) {
                if (data.results.status * 1 < 300) {
                    // In case success
                    oModel.setData(data);
                    oModel.refresh();
                    if(oSettings.success){
                        oSettings.success(data);
                    }
                } else {
                    // In case error
                    if(oSettings.error){
                        oSettings.error(data);
                    }
                }
            }.bind(this));
        },

        /**
         * Check if the url should has conditions
         * @param oSettings
         * @returns {boolean}
         * @private
         */
        _checkURLWithCondition: function(oSettings){
            if(oSettings.filters){
                return true;
            }
            return false;
        },

         _setURLByFilters: function(baseURL, filters){
             if(!filters || filters.length === 0){
                 return baseURL;
             }
             var i = 0, len = filters.length, str = '$filter=';
             for(i = 0; i < len; i++){
                 var filter = filters[i];
                 if(filter.operator === FilterOperator.EQ){
                     str = filter.path + ' eq ' + filter.value1;
                 }
                 if(i < len - 1){
                     str = str + ' and '
                 }
             }
             baseURL
         },

    });
});

