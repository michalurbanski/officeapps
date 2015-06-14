'use strict';

window.Lists = window.Lists || {};

// Creates new "ShowLists" object
Lists.ShowLists = function () {
    var lists;
    var context = SP.ClientContext.get_current();

    var webTitle = function () {
        var web = context.get_web(); //.get_title();

        context.load(web);
        context.executeQueryAsync(
                Function.createDelegate(this, function () {
                    alert('Page title is: ' + web.get_title());
                }),
                Function.createDelegate(this, function (args) {
                    alert(args.get_message());
                })
        );
    };

    var get_lists = function () {
        //TODO - implement
    };

    return {
        webTitle: webTitle,
        get_lists: get_lists
    }
}();