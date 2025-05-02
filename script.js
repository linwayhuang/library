const myLibrary = [
  { title: 'The 4 Hour Work Week', author: 'Timonthy Ferriss', pages: 396, status: 'yes', id: crypto.randomUUID()},
  { title: 'The Star', author: 'John Henry', pages: 847, status: 'no', id: crypto.randomUUID()}
];

const example = { title: 'The Sun', author: 'Jane Doe', pages: 1000, status: 'no',}

const form = document.getElementById('myForm');

// Run the displayBookInTable function first to add id to the available books
displayBookInTable(myLibrary);

addEListenerToStatusButton();

// Add event listeners
form.addEventListener('submit', function(e) { // Use 'submit' as event listener

  // Prevent default form submission behavior
  e.preventDefault();

  // Using FormData
  const formData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }

  // Accessing form elements directly. 
  // 'title', 'author', 'pages', 'status' have to match with the form id
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');
  const statusInput = document.getElementById('status');

  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, statusInput.value);

  displayBookInTable(myLibrary);
});

// Functions
function Book(title, author, pages, status) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  // if (this.status == 'yes') {
  //   this.info = function() {
  //     console.log('The ' + this.title + ' by ' + this.author + ', ' + this.pages + ' pages, already read.')
  //   }
  // } else if (this.status == 'no') {
  //   this.info = function() {
  //     console.log('The ' + this.title + ' by ' + this.author + ', ' + this.pages + ' pages, not read yet.')
  //   }
  // }
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  book.id = crypto.randomUUID();
  myLibrary.push(book);
}

function displayBookPropertiesInCell(book) {
  const tbody = document.querySelector('tbody');

  // Clear existing table content
  // tbody.innerHTML = '';

  // Get object keys for cell contents
  const bookInfo = Object.keys(book);

  // Create table rows
  const row = document.createElement('tr');
  let cell; // Define cell like this so you can redefine it to create 'td' for each property 
  // and be able to skip the 'id' property in the object
  bookInfo.forEach(item => { /* or 'for (let prop in book)' */
    if (item == 'title') { /* item is the name for keys, not bookInfo */
      cell = document.createElement('td');
      cell.classList.add('table-book-title');
      cell.textContent = book[item];
    } else if (item == 'author') {
      cell = document.createElement('td');
      cell.classList.add('table-book-author');
      cell.textContent = book[item];
    } else if (item == 'pages') {
      cell = document.createElement('td');
      cell.classList.add('table-book-pages');
      cell.textContent = book[item];
    } else if (item == 'status') {
      cell = document.createElement('td');
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

  // Create the buttonRemove
  cell = document.createElement('td');
  cell.classList.add('table-remove-book');
  const buttonRemove = document.createElement('button');
  buttonRemove.textContent = 'Remove';
  cell.appendChild(buttonRemove);
  row.appendChild(cell);

  // Append all elements to the table
  tbody.appendChild(row);
}

function displayBookInTable(library) { 
  const tbody = document.querySelector('tbody');

  // Clear existing table content
  tbody.innerHTML = '';

  library.forEach(item => {
    displayBookPropertiesInCell(item);
  })
}

function addEListenerToStatusButton() {

  // Delegate the event listener to the container of the buttons
  // Event delegation doesn't work if you delegate to a class. Needs to be a container
  const tbody = document.querySelector('tbody');

  // Add event listener for multiple buttons by using event delegation
  // This will automatically add event listener to dynamically created buttons
    tbody.addEventListener('click', function(e) {
      const event = e.target; // 'target' is the property of the dispatch element
      if (event.matches('.button-status')) { //'matches' helps to access the class
        event.classList.toggle('inactive'); // 'classList' helps to manipulate the element's classes
        if (event.classList.contains('inactive')) {
          event.textContent = 'Not Read';
        } else {
          event.textContent = 'Read';
        }
      }
    })
}