define(['knockout', 'durandal/system'], function(ko, system) {

    var canPlayVideo = ko.observable([false]);
    var volumeFloat = ko.observable(0);
    var enableForwardPlayback = ko.observable([false]);
    var enableBackwardPlayback = ko.observable([false]);


    function attached(view, parent) {
        canPlayVideo(true)
    }

    function forwardPlayClickEvent() {
        enableForwardPlayback(true);
    }

    function backwardPlayClickEvent() {
        enableBackwardPlayback(true);
    }

    function playClickEvent() {
        canPlayVideo(true)
    }

    function pauseClickEvent() {
        canPlayVideo(false)
    }

    function incrementVolumeClickEvent() {
        var volume = parseFloat(volumeFloat().toFixed(2));
        system.log("incrementVolumeClickEvent: volume: " + volume);

        if(volume >= 0 && volume <= 0.9)
            volumeFloat(volume + 0.1);
    }

    function decrementVolumeClickEvent() {
        var volume = parseFloat(volumeFloat().toFixed(2));
        system.log("decrementVolumeClickEvent: volume: " + volume);

        if(volume >= 0.1 && volume <= 1.0)
            volumeFloat(volume - 0.1);
    }

    function muteVolumeClickEvent() {
        volumeFloat(0);
    }

    this.volume = ko.computed(function() {
        return parseInt(volumeFloat() * 10);
    }, this);

    var viewModel =  {
        backwardPlayClickEvent: backwardPlayClickEvent,
        forwardPlayClickEvent: forwardPlayClickEvent,
        enableForwardPlayback: enableForwardPlayback,
        enableBackwardPlayback: enableBackwardPlayback,
        muteVolumeClickEvent: muteVolumeClickEvent,
        incrementVolumeClickEvent: incrementVolumeClickEvent,
        decrementVolumeClickEvent: decrementVolumeClickEvent,
        playClickEvent: playClickEvent,
        pauseClickEvent: pauseClickEvent,
        canPlayVideo: canPlayVideo,
        volumeFloat: volumeFloat,
        volume: volume,
        attached: attached
    };

    return viewModel;
});
