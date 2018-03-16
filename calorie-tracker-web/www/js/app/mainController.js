
var mainController = (function(model,session) {

    function getDate() {
        return model.getDate();
    }

    function getUser() {
        //username is stored in session when login occurs.
        var username = session.getUsername();
        return model.getUserByUsername(username);
    }

    function getDailyIntake(date) {
        var user = getUser();

        var dailyIntake = null;
        if(user != null && date != null) {
            dailyIntake = user.findDailyIntake(date);
        }
        return dailyIntake;
    }

    function addServing(serving) {

        var user = getUser();
        if(user != null) {
            var dailyIntake = user.findDailyIntake(serving.date);
            if(dailyIntake == null) dailyIntake = new model.DailyIntake(serving.date);
            dailyIntake.addServing(serving);
            user.addDailyIntake(dailyIntake);
            dailyIntake.calculate();
            model.addUser(user);
        }

        return dailyIntake;
    }

    return {
        addServing: addServing,
        getDailyIntake: getDailyIntake,
        getDate:getDate
    }
})(model,session);
