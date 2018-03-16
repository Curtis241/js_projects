
var loginController = (function(model,session){

    function createCredentials(username,password) {
        return new model.Credentials(username,password,password);
    }

    function authenticate(username) {

        var user = model.getUserByUsername(username);

        if(user != null) {
            session.setUsername(user.username);

            var firstName = user.registrationInfo.firstName;
            var lastName = user.registrationInfo.lastName;
            session.setName(firstName,lastName);

            return true;
        }

        return false
    }

    return {
        authenticate:authenticate,
        createCredentials:createCredentials
    }
}(model,session));
