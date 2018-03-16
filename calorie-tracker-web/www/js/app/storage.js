/**
 * Created by cpeterson on 18/04/16.
 */

var storage = (function($) {
    
    var host = "http://calorietracker/";
    
    var clearAll = function() {
        
    };
    
    var getUser = function (id) {
        
    };


    var authenticate = function (username,password) {
        return $.ajax({
            url: host + 'ws/authenticate?username=' + username + '&password=' + password,
            type: 'GET',
            crossDomain: true,
            datatype: 'application/json',
            success: function success(result,status,xhr) { return result.hash; },
            error: function error(result,status,xhr) { return result; },
            beforeSend: setHeader
        });
    };

    var getUsers = function() {

    };



    function setHeader(xhr) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    }
    
    var removeUser = function(user) {
    
    };
    
    var addUser = function (user) {
        
    };
    
    var addServing = function (serving) {
        
    };

    return {
        authenticate: authenticate,
        addUser: addUser,
        getUser: getUser,
        getUsers: getUsers,
        removeUser: removeUser,
        clearAll: clearAll,
        addServing: addServing
    };
})(jQuery);


