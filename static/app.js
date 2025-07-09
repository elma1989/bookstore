import { Book } from "./book.js";
import { createBookCard } from "./templates.js";

const url = 'http://localhost:5500/book-data.json';
const books = [];
let storedBooks = []

// #region storeagemanagement
async function loadServerData() {
    const resp = await fetch(url);
    const data = await resp.json();
    const storeBooks = [];

    data.books.forEach (book => {
        storeBooks.push({
            likes: book.likes,
            liked: false,
            comments: book.comments
        });
    });

    initialLocalStorage(storeBooks);
    loadLocalStorage();
    
    data.books.forEach( (book, bookIndex) => {
        books.push(new Book(bookIndex, book.title, book.author, 
            new Date(book.published), data.path + book.img, book.price, storedBooks[bookIndex].likes, storedBooks[bookIndex].liked, 
            book.ISBN, storedBooks[bookIndex].comments));
    });
    showAllBooks();
}

function initialLocalStorage(toStore) {
    const stored = localStorage.getItem('books');
    if (stored == null) {
        localStorage.setItem('books', JSON.stringify(toStore));
    }
}

function loadLocalStorage() {
    const booksStorage = [];
    const store = localStorage.getItem('books');
    if (store != null) {
        storedBooks = JSON.parse(store)
    }
}
// #endregion

function showAllBooks() {
    const refMainContent = document.querySelector('main .content');
    refMainContent.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        refMainContent.innerHTML += createBookCard();
    }

    books.forEach(book => {
        book.renderHead();
        book.renderBody();
    });
}

loadServerData();