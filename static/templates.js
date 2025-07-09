export function createBookCard() {
    return /*html*/`
        <div class="book-card">
            <div class="bc-head"></div>
            <div class="bc-body"></div>
        </div>
    `
}

export function getBookCardHead(title, file) {
    return /*html*/`
        <div class="title">
            <h2>${title}</h2>
        </div>
        <hr>
        <div class="img-wrapper">
            <img src="${file}">
        </div>
        <hr>
    `
}

export function getBookCardBody(price, likes, author, release, isbn) {
    return /*html*/`
        <div class="price-like">
            <span class="price">${price}</span>
            <div class="likes">${likes}<img src="assets/icons/heart_empty.svg"></div>
        </div>
        <table>
            <tr><td class="key">Author:</td><td class="value right">${author}</td></tr>
            <tr><td class="key">Erschienen:</td><td class="value right">${release}</td></tr>
            <tr><td class="key isbn">ISBN:</td><td class="value isbn-value right">${isbn}</td></tr>
        </table>
        <hr>
        <div class="comment-wrapper">
            <h3>Kommentare</h3>
            <table class="comments"></table>
        </div>
        <div class="comment-input">
            <form>
                <input type="text" placeholder="Kommentar">
                <input type="submit" value="&crarr;">
                <div class="errmsg"></div>
            </form>
        </div>
    `
}

export function getSingleComment(user, message) {
    return /*html*/`
        <td class="user">${user}: </td><td class="message">${message}</td>
    `
}