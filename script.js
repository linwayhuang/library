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

function displayBookInTable(book, bookTable) {
  const tbody = bookTable.querySelector('tbody');

  // Clear existing table content
  tbody.innerHTML = '';

  // Get object keys for cell contents
  const cellContent = Object.keys(book);

  // Create table rows
  const row = document.createElement('tr');
  cellContent.forEach(item => {
    const cell = document.createElement('td');
    if (book == 'title') {
      cell.classList.add('table-book-title');
      cell.textContent = book[item];
    } else if (book == 'author') {
      cell.classList.add('table-book-author');
      cell.textContent = book[item];
    } else if (book == 'pages') {
      cell.classList.add('table-book-pages');
      cell.textContent = book[item];
    } else if (book == 'status') {
      cell.classList.add('button-status');
      cell.textContent = book[item];
    }
    row.appendChild(cell);
  })
  const cell = document.createElement('td');
  cell.classList.add('table-remove-book')
  cell.textContent = 'Remove'
  tbody.appendChild(row);
}
