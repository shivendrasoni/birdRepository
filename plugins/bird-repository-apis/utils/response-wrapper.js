/**
 * Created by shivendra on 8/9/16.
 */
'use strict';

module.exports = {
    simplifyResponse : function (data) {

        if(Array.isArray(data)) {
            var responseArray = [];

            data.forEach(function (item) {
                var response = {};
                response.id=item._id;
                response.name=item.name;
                response.continents=item.continents;
                response.family=item.family;
                response.added = item.added;
                response.visible=item.visible;
                responseArray.push(response);
            });
            return responseArray;
        }
        else {
        var response = {};
        response.id=data._id;
        response.name=data.name;
        response.continents=data.continents;
        response.family=data.family;
        response.added = data.added;
        response.visible=data.visible;

        return response;
        }
    }
}