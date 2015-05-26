﻿/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#myButton').click(insertMatrix);

            //$('#get-data-from-selection').click(getDataFromSelection);
        });
    };

    function insertMatrix() {
        var matrix = [['Element', 'Customer'],
                        ['Reference 1', 'Customer 1'],
                        ['Reference 2', 'Customer 2']];

        Office.context.document.setSelectedDataAsync(matrix, { coercionType: "matrix" }, testSuccess);
    }

    function testSuccess(asyncResult) {
        /// <summary>Common function to test error in async callback for all functions</summary>

        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            app.showNotification("Error", asyncResult.error.message);
        }
    }

    // Reads data from current document selection and displays a notification
    function getDataFromSelection() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    app.showNotification('The selected text is:', '"' + result.value + '"');
                } else {
                    app.showNotification('Error:', result.error.message);
                }
            }
        );
    }
})();