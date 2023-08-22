// Book constructor function
function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

// ibraryCatalog constructor function
function LibraryCatalog() {
  this.books = [];
}

//   LibraryCatalog prototype
LibraryCatalog.prototype = {
  // a. Add a book to the catalog
  addBook: function(book) {
    this.books.push(book);
  },
  
  //   generator function to iterate over the books
  *bookIterator() {
    for (const book of this.books) {
      yield book;
    }
  },
  
  //  Return the  generator function for iteration
  [Symbol.iterator]: function() {
    return this.bookIterator();
  },
  
  // Get books by author
  getBooksByAuthor: function(authorName) {
    return this.books.filter(book => book.author === authorName);
  }
};
 
const catalog = new LibraryCatalog();

// Adding books to the catalog
catalog.addBook(new Book("Book 1", "Author 1", "Genre 1"));
catalog.addBook(new Book("Book 2", "Author 2", "Genre 2"));
catalog.addBook(new Book("Book 3", "Author 1", "Genre 3"));
catalog.addBook(new Book("Book 4", "Author 3", "Genre 2"));

// Iterating through the books using for...of
console.log("All Books:");
for (const book of catalog) {
  console.log(`${book.title} by ${book.author}`);
}

// Getting books by a specific author
const authorName = "Author 1";
const booksByAuthor = catalog.getBooksByAuthor(authorName);
console.log(`Books by ${authorName}:`);
booksByAuthor.forEach(book => {
  console.log(`${book.title} by ${book.author}`);
});
