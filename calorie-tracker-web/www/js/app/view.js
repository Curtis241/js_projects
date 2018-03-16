
var view = (function(document){

    //Common methods used by all the views.
    function getElementById(name) {
        return document.getElementById(name);
    }

    function getInput(element) {
        return element.value;
    }

    function setInput(element,value) {
        if(element.nodeName == "INPUT") {
            element.value = value;
        } else {
            element.innerHTML = value
        }
    }

    function getInputText(inputId) {
        return getInput(getElementById(inputId))
    }

    function setInputText(inputId,value) {
        setInput(getElementById(inputId),value);
    }

    function checkInputText(value) {
        return (value !== "");
    }

    function clear(inputId) {
        var element = getElementById(inputId);
        setInput(element,"")
    }

    function validate(inputId) {
        var value = getInput(getElementById(inputId));
        var isValidated = checkInputText(value);
        return {value:value,isValidated:isValidated}
    }

    return {
        validate: validate,
        clear: clear,
        setInputText: setInputText,
        getInputText: getInputText
    }
}(document));