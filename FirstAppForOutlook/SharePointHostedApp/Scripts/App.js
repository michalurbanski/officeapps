(function () {
    "use strict";

    $(function () {
        //getUserNameUsingJsom(); 
        getUserNameUsingRest(); 
    });
}());

function getUserNameUsingJsom() {
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    context.load(user);
    context.executeQueryAsync(
        Function.createDelegate(this, function () {
            $('#message').text("Hello " + user.get_title())
        }),
        Function.createDelegate(this, function (args) {
            $('#message').text("Error getting user username. Error: " + args.get_message())
        }));

};

function getUserNameUsingRest() {
    $.ajax({
        url: "../_api/web/currentuser",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose", //NOTE: headers are mandatory!
        },
        success: function(data, status, jqXHR){
            $('#message').text("Hello " + data.d.Title);
        },
        error: function(jqXHR, status, message){
            $('#message').text("Error getting user username. Error: " + message);
        }
    });
};