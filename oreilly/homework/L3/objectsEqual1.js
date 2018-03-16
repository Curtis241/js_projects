exports.equals = function (object1, object2) {

    //Test for null objects
    if(object1 === null || object2 === null) {
        return true;
    }

    for(var prop in object1) {
        //Test for property names and values
        if(object1[prop] !== object2[prop]) {
            return false;
        }
    }

    //Test for empty objects.
    if(object1 && object2) {
        return true;
    }

    return true;
}

function Book (title, author, published, hasMovie) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.hasMovie = hasMovie;
}
var book1 = new Book("Harry Potter", "JK Rowling", 1999, true);
var book2 = new Book("Harry Potter", "JK Rowling", 1999, true);
var book3 = new Book("The Adventures of Sherlock Holmes", "Sir Arthur Conan Doyle", 1892, true);

/*
var equals = exports.equals;

 console.log("Compare book1, book2 with equals function: ");
 if (equals(book1, book2)) {
 console.log("The two books are the same");
 } else {
 console.log("The two books are different");
 }
 console.log("Compare book1, book3 with equals function: ");
 if (equals(book1, book3)) {
 console.log("The two books are the same");
 } else {
 console.log("The two books are different");
 }
 if (equals({}, {})) { console.log("empty objects are equal"); }
 if (equals({ p: null }, { p: null })) { console.log("null objects are equal"); }
 if (!equals({ o: 1 }, { p: 1 })) {
    console.log("objects with different property names are not equal");
}
 if (!equals({ o: { sub: 1 }}, { o: {sub: 1 }})) {
 console.log("objects with properties that are objects are not equal");
 }
 if (!equals({ o: function() { return 3; }}, { o: function() { return 3; }})) {
 console.log("objects with properties that are methods are not equal");
 }
 */