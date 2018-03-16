/*global define */
define(['plugins/router', 'durandal/app'], function (router, app) {
    "use strict";

    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Series', moduleId: 'viewmodels/series', nav: true },
                { route: 'episode', title: 'Episode', moduleId: 'viewmodels/episode', nav: true },
                { route: 'actor', title: 'Actor', moduleId: 'viewmodels/actor', nav: true },
                { route: 'cast', title: 'Cast', moduleId: 'viewmodels/cast', nav: true },
                { route: 'director', title: 'Director', moduleId: 'viewmodels/director', nav: true },
                { route: 'genre', title: 'Genre', moduleId: 'viewmodels/genre', nav: true },
                { route: 'rating', title: 'Rating', moduleId: 'viewmodels/rating', nav: true },
                { route: 'search', title: 'Search', moduleId: 'viewmodels/search', nav: true },
                { route: 'tags', title: 'Tags', moduleId: 'viewmodels/tags', nav: true },
                { route: 'viewings', title: 'Viewings', moduleId: 'viewmodels/viewings', nav: true }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});