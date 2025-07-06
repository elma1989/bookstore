import { Book } from "./book.js";

const url = 'http://localhost:5500/book-data.json';
const books = [];

function init() {
    loadServerData();
    console.log(books);
}

async function loadServerData() {
    const resp = await fetch(url);
    const data = await resp.json();
    data.books.forEach( (book, bookIndex) => {
        books.push(new Book(bookIndex, book.title, book.author, book.published, data.path + book.img, book.price, book.likes, book.isbn, book.comments));
    });
}


init();