'use strict';

window.Lists = window.Lists || {};

// Creates new "ShowLists" object
Lists.ShowLists = function () {
    var lists;
    var context = SP.ClientContext.get_current();

    // Gets title of web
    var webTitle = function () {
        var deffered = $.Deferred(); 

        var web = context.get_web(); //.get_title();

        context.load(web);
        context.executeQueryAsync(
                Function.createDelegate(this, function () {
                    deffered.resolve(web.get_title());

                    //alert('Page title is: ' + web.get_title());
                }),
                Function.createDelegate(this, function (sender, args) {
                    deffered.reject(sender, args);

                    //alert(args.get_message());
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
        getLists: getLists
    }
}();