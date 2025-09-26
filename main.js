const library = [];
const table = document.querySelector('table');
const dialog = document.querySelector('dialog');
const newBook = document.querySelector('table + button');
const closeButton = document.querySelector('#close');
const addButton = document.querySelector('#add')

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  library.push(book);
}

function displayBooks() {
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    if (index !== 0) row.remove(); // Keep the header
  });
  library.forEach((book) => {
    const tr = document.createElement('tr');
    
    const title = document.createElement('td');
    title.textContent = book.title;
    tr.appendChild(title);
    
    const author = document.createElement('td');
    author.textContent = book.author;
    tr.appendChild(author);
    
    const pages = document.createElement('td');
    pages.textContent = book.pages;
    tr.appendChild(pages);
    
    const isRead = document.createElement('td');
    isRead.textContent = book.isRead ? '✅' : '❌';
    tr.appendChild(isRead);
    
    const toggle = document.createElement('td');
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Read';
    toggleButton.setAttribute('data-id', book.id);
    toggleButton.addEventListener('click', (e) => {
      library.find((book) => book.id === e.target.getAttribute('data-id')).toggleRead();
      displayBooks();
    });
    toggle.appendChild(toggleButton);
    tr.appendChild(toggle);
    
    const remove = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('data-id', book.id);
    removeButton.addEventListener('click', (e) => {
      const removedBookIndex = library.findIndex((book) => book.id === e.target.getAttribute('data-id'));
      library.splice(removedBookIndex, 1);
      displayBooks();
    });
    remove.appendChild(removeButton);
    tr.appendChild(remove);
    
    table.appendChild(tr);
  })
}

newBook.addEventListener('click', () => {
  dialog.showModal();
})

closeButton.addEventListener('click', () => {
  dialog.close();
})

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;
  addBookToLibrary(title, author, pages, isRead);
  displayBooks();
  dialog.close();
  document.querySelector('form').reset();
})

displayBooks();