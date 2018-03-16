/*global define */
define(['durandal/system', 'durandal/app', 'jquery', 'logger', 'knockout', 'datacontext', 'datetimepicker', 'math-uuid'],
    function (system, app, $, logger, ko, datacontext, datetimepicker) {
        "use strict";
        var setupDateTimePicker = function () {
            $('.form_date').datetimepicker({
                language:  'en',
                weekStart: 1,
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0
            });
        };

        var selectedItem = ko.observable([]);
        var enableNewButton = ko.observable(true);
        var enableDeleteButton = ko.observable(false);
        var enableSaveButton = ko.observable(false);

        var itemClicked = function (obj) {
            logger.log("ItemClicked: " + obj);

            if (obj) {
                ko.utils.arrayForEach(datacontext.model.seriesList(), function (series) {
                    series.isSelected(false);
                });

                selectedItem(obj);
                obj.isSelected(true);
                enableDeleteButton(true);
                enableSaveButton(true);
                setupDateTimePicker();
            }
        };

        var saveButtonClicked = function (obj) {
            logger.log("SaveItemClicked");
            enableSaveButton(true);

            if (obj.selectedItem() !== null) {
                var name = obj.selectedItem().name();
                var seasons = obj.selectedItem().seasons();
                var startdate = obj.selectedItem().startdate();
                var enddate = obj.selectedItem().enddate();

                datacontext.createSeriesClientObject(name, seasons, startdate, enddate);
                datacontext.updateSeries(obj);
                enableSaveButton(true);
                setupDateTimePicker();
            }
        };

        var newButtonClicked = function (obj) {
            logger.log("NewItemClicked");

            this.selectedItem({id: Math.uuidCompact(), "name": "<Create new series>", "seasons": "", "startdate": "", "enddate": ""});
        };

        var deleteButtonClicked = function (obj) {
            logger.log("DeleteItemClicked");

            if (obj.selectedItem() !== null) {
                var name = obj.selectedItem().name();
                var id = obj.selectedItem().id();
                datacontext.removeSeriesByName(name);
                datacontext.deleteSeries(id);
                logger.log("Removed series object name: " + name);
            }
        };

        function attached(view, parent) {
            setupDateTimePicker();
            datacontext.initialize();
            logger.log("seriesList().length in series:" + datacontext.seriesList().length);
        }

        var viewModel = {
            attached: attached,
            series: datacontext.model.seriesList,
            selectedItem: selectedItem,
            itemClicked: itemClicked,
            saveButtonClicked: saveButtonClicked,
            deleteButtonClicked: deleteButtonClicked,
            newButtonClicked: newButtonClicked,
            enableSaveButton: enableSaveButton,
            enableNewButton: enableNewButton,
            enableDeleteButton: enableDeleteButton
        };

        return viewModel;
    });



