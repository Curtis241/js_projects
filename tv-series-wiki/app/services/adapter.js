/*global define */
define(['logger', 'durandal/system', 'breeze'], function (logger, system, breeze) {
    "use strict";

    var resultsAdapter = new breeze.JsonResultsAdapter({

            name: "WIKI",

            extractResults: function (data) {
                var results = data.results;
                if (!results) { throw new Error("Unable to resolve 'results' property"); }
                return results;
            },

            visitNode: function (node, mappingContext, nodeContext) {

            }
        });

    return {
        instance: resultsAdapter
    };

});