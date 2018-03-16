/*global define */
define(['logger', 'durandal/system', 'services/model', 'jquery', 'knockout', 'math-uuid'], function (logger, system, model, $, ko) {
    "use strict";

    var context = "http://www.wiki.org/product-war/ws/";

    var CreateSeriesObject = function (id, name, seasons, startdate, enddate) {
        return {id: id, name: name, seasons: seasons,  startdate: startdate, enddate: enddate};
    };

    var CreateSeriesClientObject = function (name, seasons, startdate, enddate) {
        model.seriesList.push(new model.seriesClientObject({id: Math.uuidCompact(), name: name, seasons: seasons,  startdate: startdate, enddate: enddate}));
    };

    function removeSeriesByName(name) {
        model.seriesList.remove(
            function (item) {
                return item.name() === name;
            }
        );
    }

    function deleteSeries(seriesId) {
        if (seriesId !== null) {
            $.ajax({
                type: "DELETE",
                url: context + "series/id/" + seriesId,
                success: function () {
                    logger.log("Sent series delete request");
                }
            });
        }
    }

    function selectSeries() {
        var result = $.getJSON(context + 'series')
            .done(function (data) {
                model.seriesList.removeAll();

                $.each(data, function (i, item) {
                    var obj = new model.seriesClientObject(item);
                    logger.log("Series object: Id " + obj.id() + ": Name:" + obj.name() + ": Seasons:" + obj.seasons() + ": StartDate:" + obj.startdate() + ": EndDate:" + obj.enddate());
                    model.seriesList.push(obj);
                    logger.log("seriesList.length in datacontext:" + model.seriesList().length);
                });
            })
            .fail(function () {
                logger.log("Error retrieving series");
            })
            .always(function () {
                logger.log("Completed retrieving series");
            });
    }

    function updateSeries(obj) {
        if (obj !== null) {
            logger.log("updateSeries: seriesClientObject " + ko.toJSON(obj.selectedItem));

            var id = obj.selectedItem().id();
            var name = obj.selectedItem().name();
            var seasons = obj.selectedItem().seasons();
            var startdate = obj.selectedItem().startdate();
            var enddate = obj.selectedItem().enddate();

            var seriesObject = new CreateSeriesObject(id, name, seasons, startdate, enddate);

            $.ajax({
                type: "PUT",
                url: context + "series",
                data: ko.toJSON(seriesObject),
                success: function () {
                    logger.log("Sent series insert request");
                },
                dataType: "json",
                processData: "false",
                contentType: "application/json"
            });
        }
    }

    function selectActors(seriesId) {
        if (seriesId !== null) {
            logger.log("selectActors: retrieving actors for series id " + seriesId);
        }

        var result = $.getJSON(context + 'actor/series/id/' + seriesId)
            .done(function (data) {
                model.actorList.removeAll();

                $.each(data, function (i, item) {
                    var obj = new model.actorObject(item);
                    logger.log("Actor object: Id " + obj.id() + ": Name:" + obj.name() + ": Character:" + obj.character() + ": Series:" + obj.series());
                    model.actorList.push(obj);
                    logger.log("actorList.length in datacontext:" + model.actorList().length);
                });
            })
            .fail(function () {
                logger.log("Error retrieving actors");
            })
            .always(function () {
                logger.log("Completed retrieving actors");
            });
    }

    var initialize = function () {

        if (model.seriesList().length === 0) {
            selectSeries();
        }

        //var obj1 = new CreateSeriesObject("Stargate SG-1", 10, "1997-07-27", "2007-03-13");
        //var obj2 = new CreateSeriesObject("Stargate Atlantis", 5, "2004-07-16", "2009-01-09");
        //var obj3 = new CreateSeriesObject("Star Trek - Voyager", 7, "1995-01-16", "2001-05-23");
        //var obj4 = new CreateSeriesObject("Star Trek - The Next Generation", 7, "1987-09-28", "1994-05-23");

    };

    return {
        initialize: initialize,
        updateSeries: updateSeries,
        deleteSeries: deleteSeries,
        removeSeriesByName: removeSeriesByName,
        createSeriesClientObject: CreateSeriesClientObject,
        seriesList: model.seriesList,
        selectActors: selectActors,
        model: model

    };

});