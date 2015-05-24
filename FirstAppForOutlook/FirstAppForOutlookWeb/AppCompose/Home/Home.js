/// <reference path="../App.js" />

(function () {
    'use strict';

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#set-subject').click(setSubject);
            $('#set-body').click(setBody); 
            $('#get-subject').click(getSubject);
            $('#add-to-recipients').click(addToRecipients);
            $('#add-to-bcc').click(addToBcc);
        });
    };

    function setSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.setAsync("Hello world!");
    }

    function setBody() {
        // Create html body 
        var mainDiv = $("<div>");
        mainDiv.append($("<h2>").text("This is predefined body - fill with your own content"));

        var item = Office.cast.item.toItemCompose(Office.context.mailbox.item);

        // We need to convert created content to html here (note usage of coercion type)
        item.body.setSelectedDataAsync(mainDiv.html(), {coercionType: Office.CoercionType.Html});
    }

    function addToBcc() {
        var item = Office.context.mailbox.item;
        var addressToAdd = {
            displayName: Office.context.mailbox.userProfile.displayName,
            emailAddress: Office.context.mailbox.userProfile.emailAddress
        };

        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            Office.cast.item.toMessageCompose(item).bcc.addAsync([addressToAdd]);
        }
    }

    function getSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function (result) {
            app.showNotification('The current subject is', result.value)
        });
    }

    function addToRecipients() {
        var item = Office.context.mailbox.item;
        var addressToAdd = {
            displayName: Office.context.mailbox.userProfile.displayName,
            emailAddress: Office.context.mailbox.userProfile.emailAddress
        };
 
        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            Office.cast.item.toMessageCompose(item).to.addAsync([addressToAdd]);
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            Office.cast.item.toAppointmentCompose(item).requiredAttendees.addAsync([addressToAdd]);
        }
    }

})();