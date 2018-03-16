var model = (function() {
        var userKeyPrefix = "user";
        var calorieLimit = 1700;
        var servingsPerTablePage = 7;

        function isUndefined(value) {

            if(value === "" || value === null || value === undefined) {
                console.log("model.isUndefined: value: " + value + " is true");
                return true;
            }
            console.log("model.isUndefined: value: " + value + " is false");
            return false
        }

        function checkResult(code,value,message){
            return {code:code,value:value,message:message};
        }

        function checkDateFormat(value) {

            console.log("model.checkDateFormat: value: " + value);

            var errorMessage = "checkDateFormat: Date format incorrect should be yyyy-mm-dd";

            if(value.length == 10) {
                var year = parseInt(value.substring(0, 4));
                var month = parseInt(value.substring(5, 7));
                var day = parseInt(value.substring(8, 10));

                if( month < 1 || month > 12) {
                    return checkResult(0,value,errorMessage)
                }
                if( day < 1 || day > 31) {
                    return checkResult(0,value,errorMessage)
                }
                if( year < 1000 || month > 3000) {
                    return checkResult(0,value,errorMessage)
                }
                return checkResult(1,value,"checkDateFormat: ok");
            }

            return checkResult(0, value, errorMessage);
        }


        function checkSingleArgument(methodName,name,value) {

            console.log("model.checkSingleArgument: checking methodName:" + methodName + " name:" + name + " value:" + value);

           if(isUndefined(value)) {
                throw new Error(methodName + ":" + name + " is undefined")
            }
        }

        function checkObjectArgument(methodName,object) {

            console.log("model.checkObjectArgument: methodName:" + methodName + " object:" + object);

            Object.keys(object).forEach(function(key){
                var value = object[key];
                checkSingleArgument(methodName,key,value);
            });
        }

        function getUniqueId() {

            var millis = new Date().getTime();
            var random = Math.floor((Math.random() * 100) + 1);
            var uniqueId = millis + random;

            console.log("model.getUniqueId: returning uniqueId " + uniqueId);
            return uniqueId
        }

        function concatenateUserKey(userId) {

            var userKey = userKeyPrefix + "_" + userId;
            console.log("model.concatenateUserKey: userKey " + userKey);

            return userKey;
        }

        function getDate() {

            function pad(value) {
                if (parseInt(value) < 10){
                    return "0" + value;
                }
                return value;
            }

            var dateObject = new Date();
            var year = dateObject.getFullYear();
            var month = pad(dateObject.getMonth() + 1);
            var day = pad(dateObject.getDate());

            return year.toString() + "-" + month.toString() + "-" + day.toString()
        }

        function Serving(id,meal,description,quantity,unit,calories){
            this.id = id;
            this.date = "";
            this.meal = meal;
            this.description = description;
            this.quantity = quantity;
            this.unit = unit;
            this.calories = calories;
            this.page = 0;
        }

        Serving.prototype.isEmpty = function() {
            return isEmpty(this);
        };

        //This is not included in the constructor so the serving object can be used
        //in the controller and also for serializing objects from localStorage.
        Serving.prototype.addDate = function(date) {
            this.date = date;
        };

        function DailyIntake(date,totalCalories,calorieLimit,calorieDiff) {
            this.index = 0;
            this.date = date;
            this.servings = [];
            this.totalCalories = totalCalories;
            this.calorieLimit = calorieLimit;
            this.calorieDiff = calorieDiff;
            this.pages = 0;
        }

        DailyIntake.prototype.addServing = function(serving){

            if(serving instanceof Serving) {

                //Add index to the serving so it can be ordered in the table.
                var count = this.servings.length;
                //Add 1 to deal with 0 based array.
                serving.id = count + 1;
                //Calculate the number of pages required if displayed in a table.
                serving.page = calculatePage(serving.id);
                this.pages = serving.page;

                var servingJson = JSON.stringify(serving);
                console.log("model.addServing: " + servingJson);

                this.servings.push(serving)
            } else {
                throw new Error("addServing: function parameter not instanceOf Serving")
            }
            return serving;
        };

        function calculatePage(arrayCount) {
            if(arrayCount > 0) {
                return Math.ceil(arrayCount / servingsPerTablePage);
            }
        }

        DailyIntake.prototype.calculate = function() {
            console.log("model.calculateDailyIntake: called");

            //Check that there is more than 1 serving to work with.
            var dailyIntake = this;
            if (dailyIntake.servings.length > 0) {
                dailyIntake.totalCalories = 0;

                //Total all calories from the servings
                for (var j = 0; j < this.servings.length; j++) {
                    dailyIntake.totalCalories = parseInt(dailyIntake.totalCalories) + parseInt(this.servings[j].calories);
                }
                dailyIntake.calorieDiff = parseInt(calorieLimit) - parseInt(dailyIntake.totalCalories);
                dailyIntake.calorieLimit = parseInt(calorieLimit);
            }

            return dailyIntake;
        };

        function getCalorieLimit() {
            return calorieLimit;
        }

        function setCalorieLimit(number) {
            calorieLimit = number;
        }

        function Credentials(username, password, confirmPassword) {
            this.username = username;
            this.password = password;
            this.confirmPassword = confirmPassword;
        }

        Credentials.prototype.isEmpty = function () {
            return (this.username == undefined && this.password == undefined)
        };

        Credentials.prototype.isPasswordConfirmed = function() {
            return (this.password != undefined && this.password == this.confirmPassword)
        };

        function RegistrationInfo(firstName,lastName,city,state,country,email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.city = city;
            this.state = state;
            this.country = country;
            this.email = email;
        }

        function isEmpty(obj) {
            var isEmptyResult = false;
            for(var i=0;i<Object.keys(obj).length;i++) {
                var key = Object.keys(obj)[i];
                var value = obj[key];
                if(key != "isEmpty" && key != "page") {
                    if (value == "") {
                        isEmptyResult = true;
                        break;
                    }
                }
            }
            return isEmptyResult;
        }

        RegistrationInfo.prototype.isEmpty = function() {
            return isEmpty(this);
        };

        function User(id,username,md5hash) {
            this.id = id;
            this.username = username;
            this.md5hash = md5hash;
            this.dailyIntakes = [];
            this.registrationInfo = "";
        }

        User.prototype.addRegistrationInfo = function(registrationInfo) {

            if(registrationInfo instanceof RegistrationInfo) {
                this.registrationInfo = registrationInfo;
            } else {
                throw Error("addRegistrationInfo: function parameter not instanceOf RegistrationInfo");
            }
            return registrationInfo;
        };

        User.prototype.addDailyIntake = function(dailyIntake){

            if(dailyIntake instanceof DailyIntake)
            {
                var dailyIntakeJson = JSON.stringify(dailyIntake);
                console.log("model.addDailyIntake: " + dailyIntakeJson);

                //Look for the dailyIntake object.
                var dailyIntakeResult = this.findDailyIntake(dailyIntake.date);

                //If it does not exist then push it into the array, but if it does
                //then replace it.
                if(dailyIntakeResult == null) {
                    this.dailyIntakes.push(dailyIntake)
                } else {
                    this.dailyIntakes[dailyIntakeResult.index] = dailyIntake;
                }

            } else {
                throw Error("addDailyIntake: function parameter not instanceOf DailyIntake");
            }
            return dailyIntake;
        };

        User.prototype.findDailyIntake = function(dateString) {

            console.log("model.findDailyIntake: looking for dailyIntake with date " + dateString);

            //Validate the entered date string and throw error if it is not ok. This makes the data format consistent throughout
            if(checkDateFormat(dateString).code == 1) {
                //Search for the dailyIntake that matches todays date.
                var user = this;
                for (var i = 0; i < user.dailyIntakes.length; i++) {

                    if (user.dailyIntakes[i].date == dateString) {
                        //Add the index value
                        dailyIntake = user.dailyIntakes[i];
                        dailyIntake.index = i;
                        return dailyIntake;
                    }
                }
                //If there are no matches then return null.
                return null;
            } else {
                throw new Error("findDailyIntake: dateString format should be yyyy-mm-dd")
            }
        };

        var clearAll = function() {

            console.log("model.clearAll: called");

            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                localStorage.removeItem(key);
            }
            console.log("model.clearAll: removed " + localStorage.length + " keys from local storage");
        };

        var getUser = function (id) {

            console.log("model.getUser: retrieving user with id " + id);
            checkObjectArgument("id",id);
            var JSonItem = localStorage.getItem(concatenateUserKey(id));

            return JSON.parse(JSonItem);
        };

        var getUsers = function() {

            console.log("model.getUsers: called");
            var users = [];

            for (var u = 0; u < localStorage.length; u++) {
                var key = localStorage.key(u);
                if (key.substring(0, userKeyPrefix.length) == userKeyPrefix) {
                    var JSonItem = localStorage.getItem(key);
                    var userJsonItem = JSON.parse(JSonItem);

                    console.log("model.getUsers: retrieved item " + userJsonItem.id);
                    var user = new User(userJsonItem.id,userJsonItem.username,userJsonItem.md5hash);

                    var info = userJsonItem.registrationInfo;
                    var firstName = info.firstName;
                    var lastName = info.lastName;
                    var city = info.city;
                    var state = info.state;
                    var country = info.country;
                    var email = info.email;
                    user.addRegistrationInfo(new RegistrationInfo(firstName,lastName,city,state,country,email));

                    for(var d = 0; d < userJsonItem.dailyIntakes.length; d++) {
                        var dailyIntakeJson = userJsonItem.dailyIntakes[d];
                        var dailyIntakeDate = dailyIntakeJson.date;
                        var dailyIntake = user.addDailyIntake(new DailyIntake(dailyIntakeDate));

                        for (var s=0; s < dailyIntakeJson.servings.length; s++){
                            var servingJson = dailyIntakeJson.servings[s];

                            var id = servingJson.id;
                            var date = servingJson.date;
                            var meal = servingJson.meal;
                            var description = servingJson.description;
                            var quantity = servingJson.quantity;
                            var unit = servingJson.unit;
                            var calories = servingJson.calories;
                            var serving = new Serving(id,meal,description,quantity,unit,calories);
                            serving.addDate(date);
                            dailyIntake.addServing(serving)

                        }

                        dailyIntake.calculate()
                    }

                    users.push(user);
                }
            }

            console.log("model.getAll: retrieved " + users.length + " users from local storage");

            return users;
        };

        var getUserByUsername = function(username) {

            console.log("model.getUserByUsername: looking for username " + username);

            var users = getUsers();
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == username) {
                    return users[i];
                }
            }
            return null;
        };

        var removeUser = function(user) {

            console.log("model.removeUser: called");
            checkObjectArgument("getUser",user);

            localStorage.removeItem(concatenateUserKey(user.id));
            console.log("model.remove: removed user with key " + user.id + " from local storage");
        };

        var addUser = function (user) {

            checkObjectArgument("getUser",user);

            var JSonItem = JSON.stringify(user);
            console.log("model.addUser: stringified user " + JSonItem);
            var key = concatenateUserKey(user.id);

            //If the user exists then remove it because there should only be one.
            var foundUser = getUserByUsername(user.username);
            if(foundUser != null) {
                localStorage.removeItem(concatenateUserKey(foundUser.id))
            }
            //Add the item.
            localStorage.setItem(key, JSonItem);

            return user.id;
        };

        var createUser = function(username,password) {

            checkSingleArgument("createUser","username",username);
            checkSingleArgument("createUser","password",password);

            var md5hash = md5(username,password);

            return new User(getUniqueId(),username,md5hash);
        };

    return {
        Credentials: Credentials,
        Serving: Serving,
        DailyIntake: DailyIntake,
        RegistrationInfo: RegistrationInfo,
        getDate: getDate,
        createUser: createUser,
        addUser: addUser,
        getUser: getUser,
        getUserByUsername: getUserByUsername,
        getUsers: getUsers,
        removeUser: removeUser,
        clearAll: clearAll,
        getCalorieLimit: getCalorieLimit,
        setCalorieLimit: setCalorieLimit,
        checkDateFormat: checkDateFormat
    };
})();
