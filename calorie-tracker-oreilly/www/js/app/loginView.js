
var loginView = (function(document,view,controller) {

    function createAccountButtonHandler() {
        window.location = "registration.html"
    }

    function loginButtonClickHandler() {

        var obj = getFormInput();

        //Retrieve from local model. If it does not exist then display error
        var isAuthenticated = controller.authenticate(obj.username);

        //Check if md5 hash matches what is already stored. If it does not then show "Invalid username/password" message.
        if(isAuthenticated == false) {
            displayError("Username/password invalid");
        } else {
            // and then forward to main.html
            window.location = 'main.html';
        }
    }

    function validate(inputId) {
        return view.validate(inputId).value;
    }

    var getFormInput = function() {
        console.log("loginPage.getFormInput: called");

        var username = validate("usernameInput");
        var password = validate("passwordInput");

        return controller.createCredentials(username,password);
    };

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

    return {
        createAccountButtonHandler:createAccountButtonHandler,
        loginButtonClickHandler:loginButtonClickHandler

    }
}(document,view,loginController));





