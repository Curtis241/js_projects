/*global define */
define(['durandal/system', 'durandal/app', 'jquery', 'logger', 'knockout', 'datacontext'],
    function (system, app, $, logger, ko, datacontext) {
        "use strict";

        var selectedSeriesItem = ko.observable([]);

        selectedSeriesItem.subscribe(function () {
            if (ko.utils.unwrapObservable(selectedSeriesItem) !== undefined) {
                if (selectedSeriesItem().id() !== undefined) {
                    logger.log("The selected series id is " + selectedSeriesItem().id());
                    datacontext.selectActors(selectedSeriesItem().id());
                }
            }
        });

        var editButtonClicked = function () {

        };

        var deleteButtonClicked = function () {

        };

        function attached(view, parent) {
            datacontext.initialize();
            selectedSeriesItem(undefined);
            //var seriesId = datacontext.seriesList()[0].id();
            //datacontext.selectActors(seriesId);
            //logger.log("seriesList().length in actor:" + datacontext.seriesList().length);
        }



        var GridViewModel = function (initialData) {
            var self = this;
            window.viewModel = self;

            self.list = initialData;
            self.pageSize = ko.observable(5);
            self.pageIndex = ko.observable(0);

            self.pagedList = ko.dependentObservable(function () {
                var size = self.pageSize();
                var start = self.pageIndex() * size;
                return self.list.slice(start, start + size);
            });
            self.maxPageIndex = ko.dependentObservable(function () {
                return Math.ceil(self.list().length / self.pageSize()) - 1;
            });
            self.previousPage = function () {
                if (self.pageIndex() > 0) {
                    self.pageIndex(self.pageIndex() - 1);
                }
            };
            self.nextPage = function () {
                if (self.pageIndex() < self.maxPageIndex()) {
                    self.pageIndex(self.pageIndex() + 1);
                }
            };
            self.allPages = ko.dependentObservable(function () {
                var pages = [];
                var i = 0;
                for (i; i <= self.maxPageIndex(); i++) {
                    pages.push({ pageNumber: (i + 1) });
                }
                return pages;
            });
            self.moveToPage = function (index) {
                self.pageIndex(index);
            };
        };

        var viewModel = {
            attached: attached,
            gridViewModel: new GridViewModel(datacontext.model.actorList),
            editButtonClicked: editButtonClicked(),
            deleteButtonClicked: deleteButtonClicked(),
            series: datacontext.model.seriesList
        };

        return viewModel;
    });
