let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
};

function addBookToLibrary(book) {
    myLibrary.push(book)
};

function showLibrary(libraryArray) {
    const library = document.querySelector('.library');

    if(libraryArray.length == 0) {
        const fragment = document.createDocumentFragment();
        const nullEntry = fragment
            .appendChild(document.createElement('tr'))
            .appendChild(document.createElement('td'));
        nullEntry.textContent = 'Your library is empty!';
        nullEntry.colSpan = 5;
        library.replaceChildren(library.firstElementChild);
        library.appendChild(fragment);
    } else {
        library.replaceChildren(library.firstElementChild);

        libraryArray.forEach((book, index) => {
            const fragment = document.createDocumentFragment();
            const newRow = fragment.appendChild(document.createElement('tr'));
            const bookEntry = [book.title, book.author, book.pages, ''];
            
            bookEntry.forEach((bookInfo) => {
                const td = document.createElement('td');
                td.textContent = bookInfo;
                newRow.appendChild(td)
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = 'Delete';
            const tdButton = document.createElement('td');
            tdButton.appendChild(deleteButton);
            newRow.appendChild(tdButton);
            deleteButton.addEventListener('click', () => {
                myLibrary.splice(myLibrary.indexOf(book), 1);
                showLibrary(myLibrary);
            });

            const readToggle = newRow.querySelector('td:nth-child(4)');
            const readFragment = document.createDocumentFragment();
            const readMenu = readFragment.appendChild(document.createElement('select'));
            const readOptions = ['No', 'Yes', 'In Progress'];
            
            readOptions.forEach((opt) => {
                const readOption = document.createElement('option');
                readOption.textContent = opt;
                readMenu.appendChild(readOption)
            });

            readToggle.appendChild(readFragment)
            
            library.appendChild(fragment);
        })


    }
}

let book1 = new Book('bookA', 'authorA', 123);
addBookToLibrary(book1);
let book2 = new Book('bookB', 'authorb', 456);
addBookToLibrary(book2);
let book3 = new Book('bookC', 'authorc', 789);
addBookToLibrary(book3);
let book4 = new Book('bookD', 'authord', 123);
addBookToLibrary(book4);

showLibrary(myLibrary)

const dialog = document.querySelector('dialog');
const addNewButton = document.querySelector('.addNewButton');
const cancelButton = document.querySelector('.cancelButton');
const submitButton = document.querySelector('button[type="submit"]');
const form = document.querySelector('form');

addNewButton.addEventListener('click', () => dialog.showModal());
cancelButton.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form, submitButton);
    const newBook = new Book(formData.get('title'), formData.get('author'), formData.get('pages'));
    addBookToLibrary(newBook);
    showLibrary(myLibrary);
    form.reset();
    dialog.close();
});

form.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitButton.click();
    }
});
