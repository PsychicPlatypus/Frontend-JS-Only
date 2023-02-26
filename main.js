import "./style.css";
import { expandBook } from "./book.js";
import BOOKS from "./books.json";

function addBookToCart(book) {
    console.log("here");
    const cart = document.getElementById("shopping-basket");
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <div class="cart-item-title">${book.title}</div>
        <div class="cart-item-price">${book.price} <i class="fas fa-euro-sign"></i></div>
    `;
    cart.appendChild(cartItem);
}

const bookCard = (book) => `
    <div class="card" id="base-card" name="${book.id}">
        <did class="card-body" id="no-style">
            <button id="overlay-button">
                <div class="card-title" id="card-title">${book.title}</div>
                <div class="card-subtitle" id="card-subtitle">${book.author}</div>
                <div class="card-text" id="card-text">${book.description}</div>
            </button>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-secondary">${book.category}</button>
                <button type="button" class="btn btn-outline-primary" ">
                    ${book.price} <i class="fas fa-euro-sign"></i>
                </button>
            </div>
        </div>
    </div>
`;

const bookList = document.getElementById("book-list");
const bookListItems = BOOKS.map((book) => bookCard(book)).join("");
bookList.innerHTML = bookListItems;

// Give each card a click event listener
const cards = document.querySelectorAll("#base-card");
cards.forEach((card) => {
    card.addEventListener("click", () => {
        expandBook(card);
    });
});
