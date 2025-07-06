import { getBookCard, getSingleComment } from "./templates.js";

export class Book {
    constructor (bookIndex, title, author, release, img, price, likes, isbn, comments) {
        this.bookIndex = bookIndex;
        this.title = title;
        this.author = author;
        this.release = release;
        this.price = price;
        this.img = img;
        this.likes = likes;
        this.liked = false;
        this.isbn = isbn;
        this.comments = comments;
    }
    render() {
        const refMain = document.querySelector('main .content');
        refMain.innerHTML += getBookCard(this.title, this.img, this.price.toFixed(2), this.likes, this.author, this.release.toLocaleString('de-DE'), this.isbn);
    }
}