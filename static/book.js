import { getBookCard, getSingleComment } from "./templates.js";

export class Book {
    constructor (bookIndex, title, author, release, img, price, likes, liked, isbn, comments) {
        this.bookIndex = bookIndex;
        this.title = title;
        this.author = author;
        this.release = release;
        this.price = price;
        this.img = img;
        this.likes = likes;
        this.liked = liked;
        this.isbn = isbn;
        this.comments = comments;
    }
    
    render() {
        const refBookCard = document.querySelectorAll('.book-card');
        const day = (this.release.getDate() < 10) ? '0' + this.release.getDate():this.release.getDate();
        const month = ((this.release.getMonth() + 1) < 10) ? '0' + (this.release.getMonth() + 1):this.release.getMonth() + 1;
        const year = this.release.getFullYear();
        const date =`${day}.${month}.${year}`;

        refBookCard[this.bookIndex].innerHTML = getBookCard(this.title, this.img, new Intl.NumberFormat('de-DE', {style:'currency', currency: 'EUR'}).format(this.price), this.likes, this.author, date, this.isbn);
        const refHeart = document.querySelectorAll('.likes');
        if (this.liked) {
            refHeart[this.bookIndex].classList.add('liked');
        }

        this.comments.forEach(comment => {
            const table = document.querySelectorAll('.comments');
            const tr = document.createElement('tr');
            tr.innerHTML = getSingleComment (comment.user, comment.message);
            table[this.bookIndex].appendChild(tr);
        });
    }

    save() {
        const stored = localStorage.getItem('books');
        if (stored != null) {
            const data = JSON.parse(stored);
            data[this.bookIndex] = {
                likes: this.likes,
                liked: this.liked,
                comments: this.comments
            }
            localStorage.setItem('books', JSON.stringify(data));
        }
    }

    toggleLike() {
        if (this.liked) {
            this.likes--;
            this.liked = false;
        } else {
            this.likes++;
            this.liked = true;
        }
        this.save();
        this.render();
    }
}