/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();


            $('#btnCreateBindings').click(onCreateBindings);
            $('#btnSetBindingValues').click(onSetBindingValues);
            $('#btnRegisterHandlers').click(onRegisterHandlers);

            //$('#myButton').click(insertMatrix);

            //$('#get-data-from-selection').click(getDataFromSelection);
        });
    };

    function onCreateBindings() {
        // first argument is control name in word document set via properties window
        // third argument is name used in code for this element
        Office.context.document.bindings.addFromNamedItemAsync("firstName", Office.BindingType.Text,
            { id: "firstName" }, onBindingCreated);
        Office.context.document.bindings.addFromNamedItemAsync("lastName", Office.BindingType.Text,
            { id: "lastName" }, onBindingCreated);
        Office.context.document.bindings.addFromNamedItemAsync("company", Office.BindingType.Text,
            { id: "company" }, onBindingCreated);
    }

    function onBindingCreated(asyncResult){
        if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
            app.showNotification('Added new binding with type: ' + asyncResult.value.type +
                ' and id: ' + asyncResult.value.id);
        }
        else {
            app.showNotification("Error", asyncResult.error.message);
        }
    }

    function onSetBindingValues() {
        // NOTE: first selector is Case-Sensitive
        Office.select("bindings#firstName", testSuccess).setDataAsync("Customer 1", testSuccess);
        Office.select("bindings#lastName", testSuccess).setDataAsync("Customer 2", testSuccess);
        Office.select("bindings#company", testSuccess).setDataAsync("Customer 3", testSuccess);
    }

    function onRegisterHandlers() {
        Office.select("bindings#firstName", testSuccess).addHandlerAsync(Office.EventType.BindingDataChanged,
           onBindingDataChanged, testSuccess);
        Office.select("bindings#lastName", testSuccess).addHandlerAsync(Office.EventType.BindingDataChanged,
            onBindingDataChanged, testSuccess);
        Office.select("bindings#company", testSuccess).addHandlerAsync(Office.EventType.BindingDataChanged,
            onBindingDataChanged, testSuccess);
    }

    function onBindingDataChanged(eventArgs){
        app.showNotification("Binding with id: " + eventArgs.binding.id + " was updated");
    }

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