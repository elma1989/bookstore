import { Book } from "./book.js";

const url = 'http://localhost:5500/book-data.json';
const books = [];

function init() {
    loadServerData();
}

async function loadServerData() {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    data.books.forEach( (book, bookIndex) => {
        console.log(book.published);
        console.log(new Date(book.published));
        books.push(new Book(bookIndex, book.title, book.author, new Date(book.published ), data.path + book.img, book.price, book.likes, book.ISBN, book.comments));
    });
    showAllBooks();
    console.log(books);
}

function showAllBooks() {
    document.querySelector('main .content').innerHTML = '';
    books.forEach (book => {
        book.render();
    });
}

init();