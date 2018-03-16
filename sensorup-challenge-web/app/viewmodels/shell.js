define(['plugins/router', 'durandal/app', 'durandal/composition'], function (router, app, composition) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Clients', moduleId: 'viewmodels/clients', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});


