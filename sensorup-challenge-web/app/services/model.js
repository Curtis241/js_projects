/*global define */
define(['logger', 'durandal/system', 'knockout'], function (logger, system, ko) {
    "use strict";

    var sensors = ko.observableArray([]);

    //"id":1,"name":"id001","x":9,"y":15,"heartrate":80,"temperature":37,"direction":288,"speed":0,"distance":12
    var sensor = function SensorObject(item) {
        this.id = ko.observable(item.id);
        this.name = ko.observable(item.name);
        this.position = ko.observable(item.x + "," + item.y);
        this.heartrate = ko.observable(item.heartrate);
        this.temperature = ko.observable(item.temperature);
        this.direction = ko.observable(item.direction);
        this.speed = ko.observable(item.speed);
        this.distance = ko.observable(item.distance);
    };

    return {
        sensor: sensor,
        sensors: sensors
    };
})