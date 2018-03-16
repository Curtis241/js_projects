/**
 * Created by cpeterson on 16/02/15.
 */
/*global define */
define(['logger', 'durandal/system', 'services/model', 'jquery', 'knockout'], function (logger, system, model, $, ko) {
    "use strict";

    //var context = "http://52.10.16.108:8080/sensorup-challenge-service/ws/";
    var context = "http://localhost:8080/sensorup-challenge-service/ws/";

    //"id":1,"name":"id001","x":9,"y":15,"heartrate":80,"temperature":37,"direction":288,"speed":0,"distance":12
    function selectSensors() {
        var result = $.getJSON(context + 'sensors')
            .done(function (data) {
                model.sensors.removeAll();

                $.each(data, function (i, item) {
                    var obj = new model.sensor(item);
                    logger.log("Sensor object: "+ ko.toJSON(obj));
                    model.sensors.push(obj);
                    logger.log("sensors.length in datacontext:" + model.sensors().length);
                });
            })
            .fail(function () {
                logger.log("Error retrieving sensors");
            })
            .always(function () {
                logger.log("Completed retrieving sensors");
            });
    }

    function addSensor() {
        $.ajax({
            type: "POST",
            url: context + "sensor",
            success: function () {
                logger.log("Sent sensor add request");
            }
        });
    }

    function simulate() {
        $.ajax({
            type: "POST",
            url: context + "simulate",
            success: function () {
                logger.log("Sent sensor simulate request");
            }
        });
    }

    return {
        selectSensors: selectSensors,
        addSensor: addSensor,
        simulate: simulate,
        model: model

    };
});
