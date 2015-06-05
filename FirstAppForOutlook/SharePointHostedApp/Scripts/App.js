(function () {
    "use strict";

    $(function () {
        getUserNameUsingJsom(); 
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
