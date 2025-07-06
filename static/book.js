export class Book {
    constructor (bookIndex, title, author, release, img, price, likes, isbn, comments) {
        this.bookIndex = bookIndex;
        this.title = title;
        this.author = author;
        this.release = Date(release);
        this.price = price;
        this.img = img;
        this.likes = likes;
        this.liked = false;
        this.isbn = isbn;
        this.comments = comments;
    }
}