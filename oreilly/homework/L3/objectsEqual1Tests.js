var chai = require("chai");
var expect = require("chai").expect;
var assert = require("chai").assert;
var src = require("./objectsEqual1");


function Book (title, author, published, hasMovie) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.hasMovie = hasMovie;
}

var book1 = new Book("Harry Potter", "JK Rowling", 1999, true);
var book2 = new Book("Harry Potter", "JK Rowling", 1999, true);
var book3 = new Book("The Adventures of Sherlock Holmes", "Sir Arthur Conan Doyle", 1892, true);



describe('equals1', function(){
    it('The two books are the same', function(){
        assert.equal(true, src.equals(book1, book2));
    })
    it('The two books are different', function(){
        assert.equal(false, src.equals(book1, book3));
    })
    it('empty objects are equal', function(){
        assert.equal(true, src.equals({}, {}));
    })
    it('null objects are equal', function(){
        assert.equal(true, src.equals(null,null));
    })
    it('objects with null properties are equal', function(){
        assert.equal(true, src.equals({ p: null }, { p: null }));
    })
    it('objects with different property names are not equal', function(){
        assert.equal(false, src.equals({ o: 1 }, { p: 1 }));
    })
    it('objects with properties that are objects are not equal', function() {
        assert.equal(false, src.equals({ o: { sub: 1 }}, { o: {sub: 1 }}))
    })
    it('objects with properties that are methods are not equal', function() {
        assert.equal(false, src.equals({ o: function() { return 3; }}, { o: function() { return 3; }}))
    })

})
