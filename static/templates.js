export function getBookCard(title, file, author, published, isbn) {
    return /*html*/`
        <div class="book-card">
            <h2>${title}</h2>
            <hr>
            <img src="${file}">
            <hr>
            <div>
                <span class="price"></span>
                <span class="likes"><img src="assets/icons/heart_empty.svg"></span>
            </div>
            <table>
                <tr><td class="key">Author:</td><td class="value">${author}</td></tr>
                <tr><td class="key">Jahr:</td><td class="value">${published}</td></tr>
                <tr><td class="key">ISBN:</td><td class="value">${isbn}</td></tr>
            </table>
            <hr>
            <h3>Kommentare</h3>
            <table class="comments"></table>
        </div>
    `
}

export function getSingleComment(user, message) {
    return /*html*/`
        <td class="user">${user}</td><td class="message">${message}</td>
    `
}