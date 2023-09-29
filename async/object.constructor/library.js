const myLibrary = [];
const showFormButton = document.getElementById("showFormButton");
const bookForm = document.getElementById("bookForm");
const bookInputForm = document.getElementById("bookInputForm");
const booksContainer = document.querySelector('#bookList');

// book prototype
function Book(title,author,pages,read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} `
  }
}

// the 3 seeded books will be displayed when page is loaded
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
myLibrary.push(book1)
const book2 = new Book("The Adventures of Huckleberry Finn", "Mark Twain",223, true)
myLibrary.push(book2)
const book3 = new Book("Harry Potter and the sorcerer's stone", "J.K.Rowling",300, true)
myLibrary.push(book3)

// console.log(booksContainer)

// iterate over the array and call the function that creates the html elements that hosts each book
myLibrary.forEach((book) => {
  addBookToPage(book)
});

function addBookToPage(book) {
  const bookCard = document.createElement('div');
  bookCard.className = "cardBook"
  booksContainer.appendChild(bookCard)

  const title = document.createElement('p');
  title.innerHTML = book.title;
  bookCard.appendChild(title);

  const author = document.createElement('p');
  author.innerHTML = book.author;
  bookCard.appendChild(author);

  const pages = document.createElement('p');
  pages.innerHTML = `${book.pages} pages`;
  bookCard.appendChild(pages);

  // const read = document.createElement('p');
  // read.innerHTML = book.read ? "read" : "not read"
  // bookCard.appendChild(read);
  // console.log(book)

  // Modify the part of your code that creates the "read" element
  const toggleButton = document.createElement('button');
  toggleButton.className = 'toggle-button';
  toggleButton.textContent = book.read ? 'Read' : 'Not Read';
  bookCard.appendChild(toggleButton);

  // Add an event listener to toggle the button
  toggleButton.addEventListener('click', () => {
      book.read = !book.read; // Toggle the 'read' property

      // Update the button text and class based on the new 'read' value
      toggleButton.textContent = book.read ? 'Read' : 'Not Read';
  });

  // create a remove book button and the function to perform such action
  const removeBook = document.createElement('button');
  removeBook.innerHTML = "Remove Book"
  bookCard.appendChild(removeBook);

  removeBook.addEventListener("click", function(event) {
    const confirmation = window.confirm('Are you sure you want to remove this book?');
    if (confirmation) {
      // Remove the card from the DOM
      // bookCard.remove();
      booksContainer.removeChild(bookCard)

      // Find the index of the book in the 'myLibrary' array and remove it
      const index = myLibrary.indexOf(book);
      if (index !== -1) {
          myLibrary.splice(index, 1);
      }
    }
  });
}


function addBookToRecord() {
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

document.addEventListener("DOMContentLoaded",addBookToRecord);
