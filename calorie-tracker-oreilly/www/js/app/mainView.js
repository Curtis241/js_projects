
var mainView = (function(document,view,controller) {

    var currentPageNumber = 0;
    var dailyIntake = null;

    function initialize() {
        dailyIntake = controller.getDailyIntake(controller.getDate());
        if (dailyIntake != null) {
            dailyIntake.calculate();
            setupPagination(dailyIntake);
            displayTableContent(dailyIntake, 1);
        }
    }

    function nextClickHandler() {

        var pageNumber = getCurrentPageNumber();
        var pages = dailyIntake.pages;
        if(pageNumber < pages) {
            displayTableContent(dailyIntake, pageNumber + 1);
        }
    }

    function previousClickHandler() {

        var pageNumber = getCurrentPageNumber();
        if(pageNumber > 1) {
            displayTableContent(dailyIntake, pageNumber - 1);
        }
    }

    function pageNumberClickHandler(item) {

        var page = parseInt(item.target.innerText);
        displayTableContent(dailyIntake,page);
    }

    function clear() {

        setTimeout(function () {
            clearAlert();
            clearForm()
        }, 5000);
    }

    function saveButtonClickHandler() {

        var serving = getFormInput();
        if(!serving.isEmpty()) {
            dailyIntake = controller.addServing(serving);
            setupPagination(dailyIntake);
            displayTableContent(dailyIntake,1);
            displaySuccessAlert("Serving saved");
            clear()

        } else {
            displayErrorAlert("Please enter values");
            clear()
        }
    }

    function searchButtonClickHandler() {

        var date = getSearchInput();

        dailyIntake = controller.getDailyIntake(date);
        if (dailyIntake != null) {
            dailyIntake.calculate();
            setupPagination(dailyIntake);
            displayTableContent(dailyIntake, 1);
        } else {
            clearTableRecords();
            clearCalorieInfo();
            showNoResultsFoundMessage();
            setupPagination(null);
        }
        //Use return false to avoid having the page postback onclick.
        //http://stackoverflow.com/questions/4096170/button-with-no-postback
        return false;
    }

    function clearForm() {
        clearInput("inputDescription");
        clearInput("inputQuantity");
        clearInput("inputCalories");
    }

    function clearAlert() {
        var div = document.getElementById("errorDiv");
        div.classList.remove("alert-danger");
        div.classList.remove("alert-success");
        div.innerHTML = "";
    }

    function displaySuccessAlert(message) {
        var div = document.getElementById("errorDiv");
        div.classList.remove("alert-danger");
        div.classList.add("alert-success");
        div.innerHTML = message;
    }

    function displayErrorAlert(message) {
        var div = document.getElementById("errorDiv");
        div.classList.remove("alert-success");
        div.classList.add("alert-danger");
        div.innerHTML = message;
    }

    function clearInput(inputId) {
        return view.clear(inputId)
    }

    function validate(inputId) {
        return view.validate(inputId).value;
    }

    var getFormInput = function () {
        console.log("mainPage.getFormInput: called");

        var date = validate("inputDate");

        var mealDropDown = document.getElementById("mealDropDown");
        var mealOption = mealDropDown.options[mealDropDown.selectedIndex];
        var meal = mealOption.value;

        var description = validate("inputDescription");
        var quantity = validate("inputQuantity");

        var unitDropDown = document.getElementById("unitDropDown");
        var unitOption = unitDropDown.options[unitDropDown.selectedIndex];
        var unit = unitOption.value;

        var calories = validate("inputCalories");

        var serving = new model.Serving(1,meal,description,quantity,unit,calories);
        serving.addDate(date);

        return serving;
    };

    /*<tr>
    <th scope="row">1</th>
        <td>05/03/2015</td>
        <td>Breakfast</td>
        <td>Rogers Granola</td>
    <td>1/4</td>
    <td>cup</td>
    <td>95</td>
    </tr>*/
   function displayTableRecord(serving) {

        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope","row");
        th.innerHTML = serving.id;
        tr.appendChild(th);

        var tdDate = document.createElement("td");
        tdDate.innerHTML = serving.date;
        tr.appendChild(tdDate);

        var tdMeal = document.createElement("td");
        tdMeal.innerHTML = serving.meal;
        tr.appendChild(tdMeal);

        var tdDescription = document.createElement("td");
        tdDescription.innerHTML = serving.description;
        tr.appendChild(tdDescription);

        var tdQuantity = document.createElement("td");
        tdQuantity.innerHTML = serving.quantity;
        tr.appendChild(tdQuantity);

        var tdUnit = document.createElement("td");
        tdUnit.innerHTML = serving.unit;
        tr.appendChild(tdUnit);

        var tdCalories = document.createElement("td");
        tdCalories.innerHTML = serving.calories;
        tr.appendChild(tdCalories);

       return tr;

   }

    function showNoResultsFoundMessage() {
        var tr = document.createElement("tr");

        var message = document.createElement("td");
        message.setAttribute("colspan","7");
        var alert = document.createElement("div");
        alert.setAttribute("class","alert alert-warning");
        alert.setAttribute("role","alert");
        alert.innerHTML = "No search results found";
        message.appendChild(alert);
        tr.appendChild(message);

        var tbody = document.getElementById("summaryTableRows");
        tbody.appendChild(tr);
    }

    function clearTableRecords() {
        clearInput("summaryTableRows")
    }

    function displayTableRecords(servings,page) {
        console.log("mainPage.displayServings: called");

        if(servings != undefined ) {
            console.log("mainPage.displayServings: processing " + servings.length + " items");

            var frag = document.createDocumentFragment();

            for (var i = 0; i < servings.length; i++) {
                var item = servings[i];
                console.log("mainPage.displayServings: processing " + item.id);

                //Only display items for the provided page.
                if(item.page == page) {
                    frag.appendChild(displayTableRecord(item));
                }
            }
            var tbody = document.getElementById("summaryTableRows");
            tbody.appendChild(frag);

        } else {
            console.log("mainPage.displayServings: no items to display");
        }
    }

    function clearCalorieInfo() {
        var totalCaloriesSpan = document.getElementById("spanTotalCalories");
        totalCaloriesSpan.innerHTML = 0;

        var calorieLimitSpan = document.getElementById("spanCalorieLimit");
        calorieLimitSpan.innerHTML = 0;

        var calorieDiffSpan = document.getElementById("spanCalorieDiff");
        calorieDiffSpan.parentNode.classList.remove("btn-danger");
        calorieDiffSpan.parentNode.classList.add("btn-primary");
        calorieDiffSpan.innerHTML = 0;
    }

    function displayCalorieInfo(dailyIntake) {
        var totalCaloriesSpan = document.getElementById("spanTotalCalories");
        totalCaloriesSpan.innerHTML = dailyIntake.totalCalories;

        var calorieLimitSpan = document.getElementById("spanCalorieLimit");
        calorieLimitSpan.innerHTML = dailyIntake.calorieLimit;

        var calorieDiff = dailyIntake.calorieDiff;
        var calorieDiffSpan = document.getElementById("spanCalorieDiff");

        if(calorieDiff < 0) {
            calorieDiffSpan.parentNode.classList.remove("btn-primary");
            calorieDiffSpan.parentNode.classList.add("btn-danger")
        }

        calorieDiffSpan.innerHTML = Math.abs(calorieDiff);
    }

    function setupPagination(dailyIntake){

        //Remove hidden class, change disabled to enabled, and add event handler for each li element
        if(dailyIntake != null && dailyIntake.pages > 1)
        {
            var previous = document.querySelector("#previous");
            previous.classList.toggle("disabled",false);
            previous.addEventListener("click",previousClickHandler);

            for(var i=1;i<(dailyIntake.pages+1);i++) {
                var li = document.querySelector("#page" + i);
                li.classList.toggle("disabled",false);
                li.classList.toggle("hidden",false);
                li.addEventListener("click",pageNumberClickHandler)
            }

            var next = document.querySelector("#next");
            next.classList.toggle("disabled",false);
            next.addEventListener("click",nextClickHandler);
        }
    }

    function displayTableContent(dailyIntake,page) {
        currentPageNumber = page;

        if(dailyIntake != null) {
            clearTableRecords();
            clearCalorieInfo();
            displayCalorieInfo(dailyIntake);
            displayTableRecords(dailyIntake.servings,page);
        }
    }

    function getCurrentPageNumber() {
        return currentPageNumber;
    }

    function getSearchInput() {
        return view.getInputText("inputSearchByDate");
    }

    return {
        initialize:initialize,
        saveButtonClickHandler:saveButtonClickHandler,
        searchButtonClickHandler:searchButtonClickHandler
    }
})(document,view,mainController);