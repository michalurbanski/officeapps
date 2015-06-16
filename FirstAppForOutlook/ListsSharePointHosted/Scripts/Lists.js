'use strict';

window.Lists = window.Lists || {};

// Creates new "ShowLists" object
Lists.ShowLists = function () {
    var lists;
    var context = SP.ClientContext.get_current();

    // Gets lists on site
    var getLists = function () {
        //TODO - implement
    };

    return {
        getLists: getLists,
    }
}();