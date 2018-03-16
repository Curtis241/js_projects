/*global define */
define(['logger', 'durandal/system', 'knockout'], function (logger, system, ko) {
    "use strict";

    var seriesList = ko.observableArray([]);
    var actorList = ko.observableArray([]);

    var seriesClientObject = function SeriesClientObject(item) {
        this.id = ko.observable(item.id);
        this.name = ko.observable(item.name);
        this.seasons = ko.observable(item.seasons);
        this.startdate = ko.observable(item.startdate);
        this.enddate = ko.observable(item.enddate);
        this.isSelected = ko.observable(false);
    };

    var seriesObject = function SeriesObject(item) {
        this.id = ko.observable(item.id);
        this.name = ko.observable(item.name);
        this.seasons = ko.observable(item.seasons);
        this.startdate = ko.observable(item.startdate);
        this.enddate = ko.observable(item.enddate);
    };

    var actorObject = function ActorObject(item) {
        this.id = ko.observable(item.id);
        this.name = ko.observable(item.name);
        this.character = ko.observable(item.character);
        this.series = ko.observable(item.series);
    };

    return {
        seriesClientObject: seriesClientObject,
        seriesObject: seriesObject,
        seriesList: seriesList,
        actorObject: actorObject,
        actorList: actorList
    };

});