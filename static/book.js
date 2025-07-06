export class Book {
    constructor (bookIndex, title, author, release, price, likes, isbn, comments) {
        this.bookIndex = bookIndex;
        this.title = title;
        this.author = author;
        this.release = Date(release);
        this.price = price;
        this.likes = likes;
        this.isbn = isbn;
        this.comments = comments;
    }
}