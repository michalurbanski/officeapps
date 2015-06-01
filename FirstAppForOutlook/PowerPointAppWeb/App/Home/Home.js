/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            var tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";

            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 

            // Event handlers registration 
            $('#cmdStart').click(onStart);
            $('#cmdPause').click(onPause);
            $('#cmdStop').click(onStop); 

            // Call to web service
            loadVideos(); 

            //$('#results').text("Hello world");
            //$('#get-data-from-selection').click(getDataFromSelection);
        });
    };

    // Reads data from current document selection and displays a notification
    //function getDataFromSelection() {
    //    if (Office.context.document.getSelectedDataAsync) {
    //        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
    //            function (result) {
    //                if (result.status === Office.AsyncResultStatus.Succeeded) {
    //                    app.showNotification('The selected text is:', '"' + result.value + '"');
    //                } else {
    //                    app.showNotification('Error:', result.error.message);
    //                }
    //            }
    //        );
    //    } else {
    //        app.showNotification('Error:', 'Reading selection data is not supported by this host application.');
    //    }
    //}
})();


// Support for yt player
var player;

function onYouTubeIframeAPIReady() {
    var videoId = "9Cyokaj3BJU"; // This should be Sweet Home Alabama :) 
    player = new YT.Player('player', {
        height: '390', 
        width: '390', 
        videoId: videoId, 
        events: {
            'onReady' : onPlayerReady
        }
    });
};

function onPlayerReady(event){
    event.target.playVideo(); 
}

function onStart() {
    player.playVideo(); 
}

function onPause() {
    player.pauseVideo(); 
}

function onStop() {
    player.stopVideo(); 
}

function loadVideos() {
    $.ajax({
        url: "/api/videos/" // by default GET
    }).done(function (videos) {
        $('#videoList').empty();

        for (var i = 0; i < videos.length; i++) {
            $('#videoList').append($("<option>", { value: videos[i].VideoId }).text(videos[i].Title));
        }

        $('#videoList').click(onLoadVideo);
    });
};

function onLoadVideo() {
    var videoId = $('#videoList').val();
    if (videoId) {
        player.loadVideoById(videoId);
    }
};