
var session = (function() {

    function isAuthenticated() {
        var username = sessionStorage.getItem("username");
        return (username != null);
    }

    function setUsername(name) {
        sessionStorage.setItem("username",name);
    }

    function getUsername() {
        return sessionStorage.getItem("username");
    }

    function setName(firstName,lastName) {
        var name = firstName + " " + lastName;
        sessionStorage.setItem("name",name);
    }

    function getName() {
        return sessionStorage.getItem("name");
    }

    return {
        isAuthenticated: isAuthenticated,
        getUsername: getUsername,
        setUsername: setUsername,
        setName:setName,
        getName: getName
    }
}());
