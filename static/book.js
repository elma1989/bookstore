import { getBookCardHead, getBookCardBody, getSingleComment } from "./templates.js";

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
    // #region methods
    // #region cardManagement
    renderHead() {
        const refBookCard = document.querySelectorAll('.bc-head');
        refBookCard[this.bookIndex].innerHTML = getBookCardHead(this.title, this.img);
        }

    renderBody() {
        const refBookCard = document.querySelectorAll('.bc-body');
        const day = (this.release.getDate() < 10) ? '0' + this.release.getDate():this.release.getDate();
        const month = ((this.release.getMonth() + 1) < 10) ? '0' + (this.release.getMonth() + 1):this.release.getMonth() + 1;
        const year = this.release.getFullYear();
        const date =`${day}.${month}.${year}`;

        refBookCard[this.bookIndex].innerHTML = getBookCardBody(new Intl.NumberFormat('de-DE', {style:'currency', currency: 'EUR'}).format(this.price), this.likes, this.author, date, this.isbn);
        const refHeart = document.querySelectorAll('.likes');
        if (this.liked) {
            refHeart[this.bookIndex].classList.add('liked');
        }

        this.comments.forEach(comment => {
            const table = document.querySelectorAll('.comments');
            const tr = document.createElement('tr');
            tr.innerHTML = getSingleComment (comment.user, comment.message);
            table[this.bookIndex].appendChild(tr);

        this.addCardEvents();
        });
    }

    addCardEvents() {
        const refLikes = document.querySelectorAll('.likes img');

        refLikes[this.bookIndex].addEventListener('click', () => {
            this.toggleLike();
        });
        document.forms[this.bookIndex].addEventListener('submit', (e) => {
            e.preventDefault();
            this.addComment();
        })
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
    // #endregion
    // #region userActions
    toggleLike() {
        if (this.liked) {
            this.likes--;
            this.liked = false;
        } else {
            this.likes++;
            this.liked = true;
        }
        this.save();
        this.renderBody();
    }

    addComment() {
        const refInput = document.querySelectorAll('input[type=text]');
        const userInput = refInput[this.bookIndex].value;
        const refErr = document.querySelectorAll('.errmsg');
        const regex = /\w : \w/i;
        let i = 0
        
        if (regex.test(userInput)) {
            for (i; i < userInput.length; i++) {
                if (userInput[i] == ':') break;
            }
            const user = userInput.substring(0, i - 1);
            const message = userInput.substring(i + 2, userInput.length);
            this.comments.push({
                user: user,
                message: message
            });
            this.save();
            this.renderBody();
        } else {
            refErr[this.bookIndex].innerHTML = 'Format verenden:</br>Nutzer : Kommentar';
        }
    }
    // #endregion
// #endregion
}