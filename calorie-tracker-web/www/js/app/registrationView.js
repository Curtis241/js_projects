
var registrationView = (function (document,view,controller) {

    function loginButtonHandler() {
        window.location = "index.html"
    }

    function createAccountButtonHandler() {
        var credentials = getCredentialsInput();

        if( !credentials.isEmpty() &&  credentials.isPasswordConfirmed()) {

            var registrationInfo = getFormInput();

            if(!registrationInfo.isEmpty()) {
                controller.register(credentials, registrationInfo);
                displaySuccess("Registration successful!");

            } else {
                displayError("Registration info has not been entered");
            }

        } else {
            displayError("Passwords do not match");
            displayPasswordValidationError()
        }
    }

    function validate(inputId) {
        var result = view.validate(inputId);
        if(result.isValidated == false) {
            displayValidationError(inputId);
        } else {
            displayValidationSuccess(inputId);
        }
        return result.value;
    }

    function displaySuccess(message) {
        var div = document.getElementById("errorDiv");
        div.classList.remove("alert-danger");
        div.classList.add("alert-success");
        div.innerHTML = message;
    }

    function displayError(message) {
        var div = document.getElementById("errorDiv");
        div.classList.remove("alert-success");
        div.classList.add("alert-danger");
        div.innerHTML = message;
    }

    function displayValidationSuccess(inputId) {
        var input = document.getElementById(inputId);
        var spanName = input.getAttribute("aria-describedby");
        var span = document.getElementById(spanName);
        span.classList.remove("glyphicon-remove");
        span.classList.add("glyphicon-ok");
        var div = input.parentNode;
        div.classList.remove("has-error");
        div.classList.add("has-success");
    }

    function displayValidationError(inputId) {
        var input = document.getElementById(inputId);
        var spanName = input.getAttribute("aria-describedby");
        var span = document.getElementById(spanName);
        span.classList.add("glyphicon-remove");
        span.classList.remove("glyphicon-ok");
        var div = input.parentNode;
        div.classList.add("has-error");
        div.classList.remove("has-success");
    }

    var getFormInput = function () {
        console.log("registrationPage.getFormInput: called");

        var firstName = validate("firstNameInput");
        var lastName = validate("lastNameInput");
        var city = validate("cityInput");
        var state = validate("stateInput");
        var country = validate("countryInput");
        var email = validate("emailInput");

        return controller.createRegistrationInfo(firstName,lastName,city,state,country,email)
    };

    var getCredentialsInput = function () {
        console.log("registrationPage.getPasswordInput: called");

        var username = validate("usernameInput");
        var password = validate("passwordInput");
        var confirmPassword = validate("confirmPasswordInput");

        return controller.createCredentials(username,password,confirmPassword)
    };

    var displayPasswordValidationError = function() {
        displayValidationError("passwordInput");
        displayValidationError("confirmPasswordInput");
    };

    return {
        loginButtonHandler:loginButtonHandler,
        createAccountButtonHandler:createAccountButtonHandler
    }
}(document,view,registrationController));