/*global define */
define(['durandal/system', 'durandal/app', 'jquery', 'logger', 'knockout', 'datacontext'],
    function (system, app, $, logger, ko, datacontext) {
        "use strict";

        var selectedSeriesItem = ko.observable([]);

        var selectAll = function SelectAll() {
            datacontext.initialize();
            logger.log("seriesList().length in episode:" + datacontext.seriesList().length);
        };

        function attached(view, parent) {
            selectAll();
        }

        var viewModel = {
            attached: attached,
            series: datacontext.model.seriesList,
            selectedSeriesItem: selectedSeriesItem
        };

        return viewModel;
    });
