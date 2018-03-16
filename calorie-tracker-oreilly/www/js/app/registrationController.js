
var registrationController = (function(model,session){

    function register(credentials,registrationInfo) {

        var user = model.createUser(credentials.username,credentials.password);
        user.addRegistrationInfo(registrationInfo);
        model.addUser(user);

        session.setUsername(credentials.username);
        session.setName(registrationInfo.firstName,registrationInfo.lastName);
    }

    function createCredentials(username,password,confirmPassword) {
        return new model.Credentials(username,password,confirmPassword);
    }

    function createRegistrationInfo(firstName,lastName,city,state,country,email) {
        return new model.RegistrationInfo(firstName, lastName, city, state, country, email);
    }

    return {
        register: register,
        createCredentials:createCredentials,
        createRegistrationInfo:createRegistrationInfo
    }
}(model,session));
