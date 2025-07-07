import { Book } from "./book.js";

const url = 'http://localhost:5500/book-data.json';
const books = [];


async function loadServerData() {
    const resp = await fetch(url);
    const data = await resp.json();
    data.books.forEach( (book, bookIndex) => {
        books.push(new Book(bookIndex, book.title, book.author, new Date(book.published), data.path + book.img, book.price, book.likes, book.ISBN, book.comments));
    });
    initialSaveLocalStorage();
    showAllBooks();
}

function initialSaveLocalStorage() {
    const booksStorage = [];
    const stored = localStorage.getItem('books');

    if (stored == null) {
        books.forEach(book => {
            booksStorage.push ({
                liked: false,
                comments: book.comments
            });
        });
        localStorage.setItem('books', JSON.stringify(booksStorage));
    }
}

function showAllBooks() {
    document.querySelector('main .content').innerHTML = '';
    books.forEach (book => {
        book.render();
    });
}

loadServerData();