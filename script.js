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

function Book(title, author, pages, status) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    if (this.status == 'yes') {
        this.info = function() {
            console.log('The ' + this.title + ' by ' + this.author + ', ' + this.pages + ' pages, already read.')
        }
    } else if (this.status == 'no') {
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

function displayBookInTable() {

}

function displayBookPropertiesInCell (book, bookTable) {
  const tbody = bookTable.querySelector('tbody');

  // Clear existing table content
  tbody.innerHTML = '';

  // Get object keys for cell contents
  const bookInfo = Object.keys(book);

  // Create table rows
  const row = document.createElement('tr');
  bookInfo.forEach(item => { /* or 'for (let prop in book)' */
    const cell = document.createElement('td');
    if (bookInfo == 'title') {
      cell.classList.add('table-book-title');
      cell.textContent = book[item];
    } else if (bookInfo == 'author') {
      cell.classList.add('table-book-author');
      cell.textContent = book[item];
    } else if (bookInfo == 'pages') {
      cell.classList.add('table-book-pages');
      cell.textContent = book[item];
    } else if (bookInfo == 'status') {
      cell.classList.add('table-book-status');
      const buttonStatus = document.createElement('button');
      buttonStatus.id = 'myButton';
      buttonStatus.classList.add('button-status');
      if (book[item] == 'yes') {
        buttonStatus.textContent = 'Read';
        cell.appendChild(buttonStatus);
      } else if (book[item] == 'no') {
        buttonStatus.classList.add('inactive');
        buttonStatus.textContent = 'Not Read';
        cell.appendChild(buttonStatus);
      }
    }
    row.appendChild(cell);
  })
  const cell = document.createElement('td');
  cell.classList.add('table-remove-book');
  const buttonRemove = document.createElement('button');
  buttonRemove.textContent = 'Remove';
  cell.appendChild(buttonRemove);
  tbody.appendChild(row);
}
