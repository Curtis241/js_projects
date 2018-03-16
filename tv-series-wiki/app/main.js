/*global define, requirejs*/
requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.0.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'datetimepicker': '../lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'logger': '../lib/logger/logger',
        'datacontext': '../app/services/datacontext',
        'model': '../app/services/model',
        'math-uuid': '../lib/math.uuid',
        'koGrid': '../lib/koGrid/koGrid-2.1.1'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'datetimepicker': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    "use strict";

    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'TV Series Wiki';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});