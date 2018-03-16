var chai = require("chai");
var expect = require("chai").expect;
var assert = require("chai").assert;
var src = require("./objectsEqual2");

var book1 = new src.book("Harry Potter", "JK Rowling", 1999, true);
var book2 = new src.book("Harry Potter", "JK Rowling", 1999, true);
var book3 = new src.book("The Adventures of Sherlock Holmes", "Sir Arthur Conan Doyle", 1892, true);

describe('equals2', function(){
    it('The two books are the same', function() {
        assert.equal(true, book1.equals(book2));
    })
   it('The two books are different', function() {
        assert.equal(false, book1.equals(book3));
    })
    it('Book1 and null are not the same', function() {
        assert.equal(false, book1.equals(null));
    })
    it('Book1 and undefined are not the same', function() {
        assert.equal(false, book1.equals(undefined));
    })
    it('Book1 and { } are not the same', function() {
        assert.equal(false, book1.equals({}));
    })

})
