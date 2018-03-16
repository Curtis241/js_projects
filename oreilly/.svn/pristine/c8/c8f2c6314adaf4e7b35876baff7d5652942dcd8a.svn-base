
exports.book = function(title, author, published, hasMovie) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.hasMovie = hasMovie;
    this.equals = function(object2) {

        //Test for null objects
        if(object2 === null || object2 === undefined) {
            return false;
        }
        //Test for title property
        if(this.title !== object2.title) {
            return false;
        }
        //Test for author property
        if(this.author !== object2.author) {
            return false;
        }
        //Test for published property
        if(this.published !== object2.published) {
            return false;
        }
        //Test for hasMovie property
        if(this.hasMovie !== object2.hasMovie) {
            return false;
        }

        return true;
    };
};

/*
var book1 = new Book("Harry Potter", "JK Rowling", 1999, true);
var book2 = new Book("Harry Potter", "JK Rowling", 1999, true);
var book3 = new Book("The Adventures of Sherlock Holmes", "Sir Arthur Conan Doyle", 1892, true);

// Test cases for the equals() method
console.log("Compare book1, book2 with equals method: ");
if (book1.equals(book2)) {
    console.log("The two books are the same");
} else {
    console.log("The two books are different");
}
console.log("Compare book1, book3 with equals method: ");
if (book1.equals(book3)) {
    console.log("The two books are the same");
} else {
    console.log("The two books are different");
}
if (!book1.equals(null)) { console.log("Book1 and null are not the same."); }
if (!book1.equals(undefined)) { console.log("Book1 and undefined are not the same."); }
if (!book1.equals({})) { console.log("Book1 and { } are not the same."); }
*/