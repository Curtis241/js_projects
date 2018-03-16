define(['durandal/system', 'durandal/app', 'jquery','knockout','datacontext','logger'],
    function(system,app,$,ko,datacontext,logger) {
        "use strict";

    var isPaginationVisible = ko.observable(false);

    function paginationController() {
        if(datacontext.sensors > 10) {
            isPaginationVisible(true);
        }
    }

    function addClientClickEvent() {
        logger.log("addClientClickEvent called");
        datacontext.addSensor();
        datacontext.selectSensors();
    }

    function updateClickEvent() {
        logger.log("updateClickEvent called");
        datacontext.simulate();
        datacontext.selectSensors();
    }

    function attached(view, parent) {
        logger.log("attached called");
        datacontext.selectSensors();
    }

    var viewModel = {
        attached: attached,
        sensors : datacontext.model.sensors,
        isPaginationVisible : isPaginationVisible,
        addClientClickEvent : addClientClickEvent,
        updateClickEvent: updateClickEvent
    }


    return viewModel;
});