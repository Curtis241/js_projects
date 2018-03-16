define(['plugins/router', 'durandal/app','durandal/composition', 'durandal/system', 'knockout'], function (router, app, composition, system, ko) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            composition.addBindingHandler('VideoControls',{
                init:function(element, valueAccessor){
                    system.log('init VideoControls BindingHandler');

                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);

                    if (valueUnwrapped == true)
                        var video = document.getElementById(element.id);
                        video.play();
                        video.volume = 0;
                },
                update:function(element, valueAccessor, allBindings){
                    system.log('update VideoControls BindingHandler');

                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);

                    var video = document.getElementById(element.id);

                    //Play/Pause Control
                    if (valueUnwrapped == true)
                        video.play();
                    else
                        video.pause();

                    //Volume Control
                    var volumeObj = allBindings.get('volume') || 0.5;
                    var volume = ko.unwrap(volumeObj);
                    video.volume = volume;

                    //Forward Control
                    var playbackObj = allBindings.get('forward');
                    var playback = ko.unwrap(playbackObj);
                    if(playback == true && video.paused == true) {
                        video.playbackRate = 2.0;
                        video.play();
                    }

                    //Backward Control
                    var playbackObj = allBindings.get('backward');
                    var playback = ko.unwrap(playbackObj);
                    if(playback == true && video.paused == true) {
                        video.playbackRate = -2.0;
                        video.play();
                    }
                }
            }),
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'video', title:'Video', moduleId: 'viewmodels/video', nav: true}
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});
