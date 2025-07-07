import { Book } from "./book.js";

const url = 'http://localhost:5500/book-data.json';
const books = [];
let storedBooks = []


async function loadServerData() {
    const resp = await fetch(url);
    const data = await resp.json();

    loadLocalStorage();

    data.books.forEach( (book, bookIndex) => {
        books.push(new Book(bookIndex, book.title, book.author, 
            new Date(book.published), data.path + book.img, book.price, book.likes, storedBooks[bookIndex].liked, 
            book.ISBN, storedBooks[bookIndex].comments));
    });
    showAllBooks();
}

function loadLocalStorage() {
    const booksStorage = [];
    const store = localStorage.getItem('books');
    if (store == null) {
        books.forEach(book => {
            booksStorage.push ({
                liked: false,
                comments: book.comments
            });
        });
        localStorage.setItem('books', JSON.stringify(booksStorage));
    } else {
        storedBooks = JSON.parse(store)
    }
}

function showAllBooks() {
    document.querySelector('main .content').innerHTML = '';
    books.forEach (book => {
        book.render();
    });
}

loadServerData();