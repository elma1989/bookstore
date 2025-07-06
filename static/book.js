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
        const day = (this.release.getDate() < 10) ? '0' + this.release.getDate():this.release.getDate();
        const month = ((this.release.getMonth() + 1) < 10) ? '0' + (this.release.getMonth() + 1):this.release.getMonth() + 1;
        const year = this.release.getFullYear();
        const date =`${day}.${month}.${year}`;
        refMain.innerHTML += getBookCard(this.title, this.img, this.price.toFixed(2), this.likes, this.author, date, this.isbn);
        this.comments.forEach(comment => {
            const table = document.querySelectorAll('.comments');
            const tr = document.createElement('tr');
            tr.innerHTML = getSingleComment (comment.user, comment.message);
            table[this.bookIndex].appendChild(tr);
        });
    }
}