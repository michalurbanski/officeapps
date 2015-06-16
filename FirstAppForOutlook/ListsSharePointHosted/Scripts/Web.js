'use strict';

window.WebMethods = window.WebMethods || {}

WebMethods.Web = function () {
    var context = SP.ClientContext.get_current(); 

    var getWebTitle = function () {
        var deferred = $.Deferred();

        var web = context.get_web();
        context.load(web);

        context.executeQueryAsync(
                function () {
                    deferred.resolve(web.get_title());
                }, 
                function (sender, args) {
                    deferred.reject(sender, args);
                }
            );

        return deferred.promise(); 
    };

    return {
        getWebTitle : getWebTitle
    }

}(); 