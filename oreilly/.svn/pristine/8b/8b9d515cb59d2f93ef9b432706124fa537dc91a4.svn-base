/**
 * Created by cpeterson on 27/04/15.
 */

window.onload = init;

function init() {
    console.log("init: called");

    var addButton = document.getElementById("addButton");
    addButton.onclick = addButtonHandler;

    var updateButton = document.getElementById("updateButton");
    updateButton.onclick = updateButtonHandler;
    updateButton.disabled = true;

    page.displayAll(storage.getAll())

}

function addButtonHandler() {
    console.log("addButtonHandler: called");

    var inputObj = page.getFormInput();
    var favorite = storage.create(inputObj.url,inputObj.title,inputObj.comment,inputObj.tags);
    storage.add(favorite);
    page.clearForm();
    page.displayAll(storage.getAll())
}

function updateButtonHandler() {
    console.log("updateButtonHandler: called");

    var inputObj = page.getFormInput();
    storage.update(inputObj);
    page.clearForm();
    page.displayAll(storage.getAll());
    document.getElementById("updateButton").disabled = true;
}

function removeItemLinkHandler(e) {
    console.log("removeItemLinkHandler: called");
    var item = e.target.parentElement.parentElement;

    console.log("removeItemLinkHandler: removing item for id " + item.id);
    storage.remove(item.id);
    page.remove(item.id);
    page.clearForm();
}

function editItemLinkHandler(e) {
    console.log("editItemLinkHandler: called");
    var item = e.target.parentElement.parentElement;

    console.log("editItemLinkHandler: editing item for id " + item.id);

    var storedItem = storage.get(item.id);
    page.setFormInput(storedItem);
    document.getElementById("updateButton").disabled = false;
}

var storage = (function() {
    var favItems = [];
    var keyPrefix = "fav";

    function Favorite(id, url, urlName, comment, tags) {
        this.id = id;
        this.key = keyPrefix + id;
        this.url = (url.substr(0, 4) === "http" ? url : "http://" + url);
        this.urlName = urlName;
        this.comment = comment;
        this.tags = tags;
    }

    function getUniqueId() {
        var millis = new Date().getTime();
        var random = Math.floor((Math.random() * 100) + 1);

        return millis + random;
    }

    var add = function (item) {
        console.log("storage.add: called");

        var key = item.key;
        var JSonItem = JSON.stringify(item);
        localStorage.setItem(key, JSonItem);

        console.log("storage.add: added favorite with key " + item.key);

    };

    var remove = function (key) {
        console.log("storage.remove: called");

        localStorage.removeItem(key);

        console.log("storage.remove: removed favorite with key " + key + " from local storage");

    };

    var update = function (item) {
        console.log("storage.update: called");

        if(item !== null || item !== undefined)
        {
            console.log("storage.update: updating favorite with key " + item.key);
            var JSonItem = localStorage.getItem(item.key);
            var storedItem = JSON.parse(JSonItem);
            storedItem.url = item.url;
            storedItem.urlName = item.title;
            storedItem.comment = item.comment;
            storedItem.tags = item.tags;
            var storedItemString = JSON.stringify(storedItem);
            localStorage.setItem(item.key, storedItemString);

        }
    };

    var get = function(key) {
        var JSonItem = localStorage.getItem(key);
        var item = JSON.parse(JSonItem);

        return new Favorite(item.id,item.url,item.urlName,item.comment,item.tags);
    };

    var getAll = function () {
        console.log("storage.getAll: called");

        favItems = [];

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, keyPrefix.length) == keyPrefix) {
                var JSonItem = localStorage.getItem(key);
                var item = JSON.parse(JSonItem);

                console.log("storage.getAll: retrieved item " + item.id);

                var favItem = new Favorite(item.id,item.url,item.urlName,item.comment,item.tags);
                favItems.push(favItem);
            }
        }

        console.log("storage.getAll: retrieved " + favItems.length + " favorites from local storage");

        return favItems;
    };

    var create = function (url, urlName, comment, tags) {
        return new Favorite(getUniqueId(), url, urlName, comment, tags);
    };

    return {
        array: favItems,
        add: add,
        getAll: getAll,
        get: get,
        remove: remove,
        create: create,
        update: update
    };

})();

var page = (function(document) {

    function setInput(name,value) {
        document.getElementById(name).value = value;
    }

    function getInput(name) {
        return document.getElementById(name).value;
    }

    function checkInputText(value,msg) {
        if(value == null || value == "") {
            alert(msg);
            return true;
        }
        return false;
    }

    function format(item) {

        //Create the list item that will be appended to the unordered list.
        var li = document.createElement("li");
        li.setAttribute("id",item.key);

        //Create span so I can use the display:block css to place on multiple lines.
        var containerSpan = document.createElement("span");

        //Create the favorite link.
        var link = document.createElement("a");
        link.setAttribute("href",item.url);
        link.setAttribute("id", "itemLink");
        link.innerHTML = item.urlName;
        containerSpan.appendChild(link);

        //Add the comment text.
        var commentSpan = document.createElement("span");
        commentSpan.setAttribute("id","comment");
        commentSpan.innerHTML = item.comment;
        containerSpan.appendChild(commentSpan);

        //Add the tags that are comma delimited.
        var tagsSpan = document.createElement("span");
        tagsSpan.setAttribute("id","tags");
        tagsSpan.innerHTML = "Tags: " + item.tags;
        containerSpan.appendChild(tagsSpan);

        //Add the remove link - styled a button as a link to avoid post back.
        var removeButton = document.createElement("input");
        removeButton.setAttribute("type","button");
        removeButton.setAttribute("id", "removeButton");
        removeButton.setAttribute("class","favoriteItemButton");
        removeButton.setAttribute("value","Remove");
        removeButton.onclick = removeItemLinkHandler;
        containerSpan.appendChild(removeButton);

        //Add a space between the remove link and edit link.
        var space = document.createTextNode("\u00A0");
        containerSpan.appendChild(space);

        //Add an edit link - styled a button as a link to avoid post back.
        var editButton = document.createElement("input");
        editButton.setAttribute("type","button");
        editButton.setAttribute("id", "editButton");
        editButton.setAttribute("class","favoriteItemButton");
        editButton.setAttribute("value","Edit");
        editButton.onclick = editItemLinkHandler;
        containerSpan.appendChild(editButton);

        li.appendChild(containerSpan);

        var br = document.createElement("br");
        li.appendChild(br);

        return li;
    }

    function clear() {
        console.log("page.clear: called");

        var ul = document.getElementById("linkList");
        var lis = ul.querySelectorAll("li");

        console.log("page.clear: found " + lis.length + " items to clear");

        for(var i=0;i<lis.length;i++) {
            var node = lis[i];
            console.log("page.clear: removing node " + node.id);
            ul.removeChild(node);
        }
    }

    var remove = function(key) {
        console.log("page.remove: called");

        var ul = document.getElementById("linkList");

        console.log("page.remove: found " + ul.childElementCount + " items to remove");

        for(var i = 0; i < ul.childElementCount; i++) {
            var node = ul.childNodes[i];
            if(node.id == key) {
                console.log("page.remove: removing node " + key);
                ul.removeChild(node);
            }
        }
    };

    var displayAll = function(items) {
        console.log("page.displayAll: called");

        clear();

        if(items.length != 0) {
            console.log("page.displayAll: processing " + items.length + " items");

            var frag = document.createDocumentFragment();

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                console.log("page.displayAll: processing " + item.id);

                frag.appendChild(format(item));
            }
            var ul = document.getElementById("linkList");
            ul.appendChild(frag);

        } else {
            console.log("page.displayAll: no items to display");
        }

    };

    var setFormInput = function(item) {
        console.log("page.setFormInput: called");

        setInput("keyInput",item.key);
        setInput("urlInput",item.url);
        setInput("titleInput",item.urlName);
        setInput("commentInput",item.comment);
        setInput("tagsInput",item.tags);

    };

    var getFormInput = function() {
        console.log("page.getFormInput: called");

        var key = getInput("keyInput");

        var url = getInput("urlInput");
        if(checkInputText(url, "Please enter a url")) return;

        var title = getInput("titleInput");
        if(checkInputText(title, "Please enter a title")) return;

        var comment = getInput("commentInput");
        if(checkInputText(comment, "Please enter a comment")) return;

        var tags = getInput("tagsInput");
        if(checkInputText(tags, "Please enter at least 1 tag")) return;

        var result = {key:key,url:url,title:title,comment:comment,tags:tags};
        console.log("page.getFormInput: received " + JSON.stringify(result));

        return result;
    };

    var clearForm = function() {
        setInput("keyInput","");
        setInput("urlInput","");
        setInput("titleInput","");
        setInput("commentInput","");
        setInput("tagsInput","");
    };

    return {
        displayAll: displayAll,
        setFormInput: setFormInput,
        getFormInput: getFormInput,
        remove: remove,
        clearForm: clearForm
    };

})(document);