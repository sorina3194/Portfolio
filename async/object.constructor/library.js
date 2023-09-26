const myLibrary = [];
const showFormButton = document.getElementById("showFormButton");
const bookForm = document.getElementById("bookForm");
const bookInputForm = document.getElementById("bookInputForm");
const booksContainer = document.querySelector('#bookList');

function Book(title,author,pages,read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} `
  }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
myLibrary.push(book1)
const book2 = new Book("The Adventures of Huckleberry Finn", "Mark Twain",223, true)
myLibrary.push(book2)
const book3 = new Book("Harry Potter and the sorcerer's stone", "J.K.Rowling",300, true)
myLibrary.push(book3)

console.log(booksContainer)

myLibrary.forEach((book) => {
  addBookToPage(book)
});

function addBookToPage(book) {
  const bookCard = document.createElement('div');
  bookCard.className = "card"
  booksContainer.appendChild(bookCard)

  const image = document.createElement('img');
  image.src = ''
  bookCard.appendChild(image);

  const title = document.createElement('p');
  title.innerHTML = book.title;
  bookCard.appendChild(title);

  const author = document.createElement('p');
  author.innerHTML = book.author;
  bookCard.appendChild(author);

  const pages = document.createElement('p');
  pages.innerHTML = book.pages;
  bookCard.appendChild(pages);

  const read = document.createElement('p');
  read.innerHTML = book.read ? "read" : "not read"
  bookCard.appendChild(read);
  console.log(book)
}


function addBook() {
  showFormButton.addEventListener("click", function () {
      bookForm.style.display = "block";
  });

  bookInputForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get input values
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const readStatus = document.getElementById("readStatus").value;
      // Create a new book object
      const newBook = new Book (title, author, pages, readStatus === "read" )
      myLibrary.push(newBook)
      addBookToPage(newBook)

      // Clear the form and hide it
      bookInputForm.reset();
      bookForm.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded",addBook);
