'use strict';

window.Lists = window.Lists || {};

// Creates new "ShowLists" object
Lists.ShowLists = function () {
    var lists;
    var context = SP.ClientContext.get_current();

    var webPromise = function () {
        var deffered = $.Deferred();

        var web = context.get_web();
        context.load(web);
        context.executeQueryAsync(
            Function.createDelegate(this, function () {
                deffered.resolve(web); // When promise isn't used then Web object can't be returned, only property like get_title
            }),
            Function.createDelegate(this, function (sender, args) {
                deffered.reject(sender, args);
            })
        );

        return deffered.promise(); 
    }

    var getWebTitle = function (web) {
        return web.get_title(); 
    }


    // Gets title of web
    var webTitle = function () {
        var deffered = $.Deferred(); 

        var web = context.get_web(); //Doesn't work in this way :) ".get_title()"; 

        context.load(web);
        context.executeQueryAsync(
                Function.createDelegate(this, function () {
                    deffered.resolve(web.get_title()); // When promise isn't used then Web object can't be returned, only property like get_title
                }),
                Function.createDelegate(this, function (sender, args) {
                    deffered.reject(sender, args);
                })
        );

        return deffered.promise(); 
    };

    // Gets lists on site
    var getLists = function () {
        //TODO - implement
    };

    return {
        webTitle: webTitle,
        getLists: getLists,
        getWebTitle: getWebTitle,
        webPromise : webPromise
    }
}();