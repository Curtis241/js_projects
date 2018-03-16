/**
 * Created by cpeterson on 18/04/16.
 */

var storage = (function($) {
    
    var host = "http://localhost:8080/";
    
    var clearAll = function() {
        
    };
    
    var getUser = function (id) {
        
    };
    
    var getUsers = function() {
        $.ajax({
            url: host + 'ws/authenticate?username=samuelpe&password=zewa5xc2',
            type: 'GET',
            crossDomain: true,
            datatype: 'application/json',
            success: success,
            error: error,
            beforeSend: setHeader
        });
    };

    function error(result,status,xhr) {
        console.log(status + " " + result);
    }

    function success(result,status,xhr) {
        console.log(status + " " + result);
    }

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
        addUser: addUser,
        getUser: getUser,
        getUsers: getUsers,
        removeUser: removeUser,
        clearAll: clearAll,
        addServing: addServing
    };
})(jQuery);


