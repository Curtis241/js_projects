define(['knockout','jquery']), function (ko,$) {

    //Binding Sample
    /*ko.bindingHandlers.Date = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            var date = moment(value());
            var strDate = date.format('MM/DD/YYYY');
            $(element).text(strDate);
        }
    };*/

    //Creates the HTML5 Video tag
    /*ko.bindingHandlers.VideoControls = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            var valueUnwrapped = ko.unwrap(value);

            if (valueUnwrapped == true)
                $(element).play();
        },
        update: function(element, valueAccessor) {
            var value = valueAccessor();
            var valueUnwrapped = ko.unwrap(value);

            if (valueUnwrapped == true)
                $(element).play();
            else
                $(element).pause();
        }
    };*/
};
