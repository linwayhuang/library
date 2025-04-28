const buttonStatus = document.querySelector('.button-status')

buttonStatus.addEventListener('click', function() {
  buttonStatus.classList.toggle('inactive');
  if (buttonStatus.classList.contains('inactive')) {
    buttonStatus.textContent = 'Not Read';
  } else {
    buttonStatus.textContent = 'Read';
  }
})

const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if (this.read == 'yes') {
        this.info = function() {
            console.log('The ' + this.title + ' by ' + this.author + ', ' + this.pages + ' pages, already read.')
        }
    } else if (this.read == 'no') {
        this.info = function() {
            console.log('The ' + this.title + ' by ' + this.author + ', ' + this.pages + ' pages, not read yet.')
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
    book = new Book(title, author, pages, read);
    book.id = crypto.randomUUID();
    myLibrary.push(book);
}

// function displayBookInTable {
//   myLibrary.forEach
// }
