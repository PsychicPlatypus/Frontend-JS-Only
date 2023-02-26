import "./style.css";
import { expandBook } from "./book.js";
import BOOKS from "./books.json";

let books,
    categories = [],
    authors = [],
    prices = [],
    chosenCategory = "All",
    chosenAuthor = "All",
    chosenPrice = "All",
    cart = [];

async function start() {
    books = BOOKS;
    getAllAuthors(books);
    getAllCategories(books);
    getAllPrices(books);
    addFilters();
    displayBooks();
}

function getAllAuthors(books) {
    const authors_ = books.map((book) => book.author);
    authors = [...new Set(authors_)];
    authors.sort();
}

function getAllCategories(books) {
    const categories_ = books.map((book) => book.category);
    categories = [...new Set(categories_)];
    categories.sort();
}

function getAllPrices(books) {
    const prices_ = books.map((book) => book.price);
    prices = [...new Set(prices_)];
    prices.sort();
}

function sortCategory(category) {
    if (category.length) {
        chosenCategory = category;
        displayBooks();
        return;
    }
    chosenCategory = "All";
    displayBooks();
}

function sortAuthor(author) {
    if (author.length) {
        chosenAuthor = author;
        displayBooks();
        return;
    }
    chosenAuthor = "All";
    displayBooks();
}

function sortPrice(price) {
    if (price.length) {
        chosenPrice = price;
        displayBooks();
        return;
    }
    chosenPrice = "All";
    displayBooks();
}

function addFilters() {
    const filterList = document.getElementById("filter-container");
    const filters = [
        {
            name: "category",
            options: categories,
            callback: (category) => {
                sortCategory(category);
            },
        },
        {
            name: "author",
            options: authors,
            callback: (author) => {
                sortAuthor(author);
            },
        },
        {
            name: "price",
            options: prices,
            callback: (price) => {
                sortPrice(price);
            },
        },
    ];

    filters.forEach((filter) => {
        const filterName = filter.name;
        const filterOptions = filter.options;
        const filterCallback = filter.callback;

        const filterDiv = document.createElement("div");
        filterDiv.classList.add("nav-item", "dropdown");
        filterDiv.innerHTML = `
            
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
        aria-expanded="false">${
            filterName.charAt(0).toUpperCase() + filterName.slice(1)
        }</a>
            <div class="dropdown-menu" id="filter-${filterName}">
                <a class="dropdown-item" href="#">All</a>
            </div>
        `;

        const dropdownMenu = filterDiv.querySelector(`#filter-${filterName}`);
        console.log(dropdownMenu);
        filterOptions.forEach((option) => {
            const optionElement = document.createElement("a");
            optionElement.classList.add("dropdown-item");
            optionElement.setAttribute("href", "#");
            optionElement.setAttribute("name", option);
            optionElement.innerHTML = option;
            dropdownMenu.appendChild(optionElement);
        });

        filterList.appendChild(filterDiv);

        // Give each dropdown item a click event listener
        const dropdownItems = filterDiv.querySelectorAll(".dropdown-item");
        dropdownItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                filterCallback(e.target.name);
            });
        });
    });
}

function addToCart(bookTitle) {
    if (bookTitle) {
        console.log(bookTitle);
        const book = books.find((book) => book.title === bookTitle);
        const bookInCart = cart.find((book) => book.title === bookTitle);
        if (bookInCart) {
            bookInCart.quantity++;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        displayCart();
    }
}

function displayCart() {
    const cartList = document.getElementById("cart-list");
    const cartListItems = cart.map((book) => cartItem(book)).join("");
    cartList.innerHTML = cartListItems;

    // Give each cart item a click event listener
    const cartItems = document.querySelectorAll("#remove-from-cart");
    cartItems.forEach((item) => {
        item.addEventListener("click", () => {
            removeBookFromCart(item.name);
        });
    });
}

function removeBookFromCart(bookTitle) {
    if (bookTitle) {
        const bookInCart = cart.find((book) => book.title === bookTitle);
        if (bookInCart) {
            if (bookInCart.quantity > 1) {
                bookInCart.quantity--;
            } else {
                cart = cart.filter((book) => book.title !== bookTitle);
            }
        }
        displayCart();
    }
}

function displayBooks() {
    const bookList = document.getElementById("book-list");
    const bookListItems = books
        .filter((book) => {
            if (chosenCategory === "All") {
                return true;
            } else {
                return book.category === chosenCategory;
            }
        })
        .filter((book) => {
            if (chosenAuthor === "All") {
                return true;
            } else {
                return book.author === chosenAuthor;
            }
        })
        .filter((book) => {
            if (chosenPrice === "All") {
                return true;
            } else {
                return (
                    Number.toString(book.price) === Number.toString(chosenPrice)
                );
            }
        })
        .map((book) => bookCard(book))
        .join("");
    bookList.innerHTML = bookListItems;

    // Give each card a click event listener
    const cards = document.querySelectorAll("#base-card");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            expandBook(card);
        });
    });

    const categoryButtons = document.querySelectorAll("#category-btn");
    categoryButtons.forEach((categoryBtn) => {
        categoryBtn.addEventListener("click", (e) => {
            sortCategory(e.target.name);
        });
    });

    const shopButtons = document.querySelectorAll("#shop-btn");
    shopButtons.forEach((shopBtn) => {
        shopBtn.addEventListener("click", (e) => {
            addToCart(e.target.name);
        });
    });
}

let bookCard = (book) => `
    <div class="card" id="base-card" name="${book.id}">
        <did class="card-body" id="no-style">
            <button id="overlay-button">
                <div class="card-title" id="card-title">${book.title}</div>
                <div class="card-subtitle" id="card-subtitle">${book.author}</div>
                <img class="card-img-top" src="" alt="Card image cap" id="hidden-image">
                <div class="card-text" id="card-text">${book.description}</div>
            </button>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-secondary" id="category-btn" name="${book.category}">
                    ${book.category}
                </button>
                <button type="button" class="btn btn-outline-primary" id="shop-btn" name="${book.title}">
                    ${book.price} <i class="fas fa-euro-sign"></i>
                </button>
            </div>
            <div id="invisible-info-bubble">
                <i class="fas fa-info-circle fa-g"></i> <span>Double click the card text to collapse it</span>
            </div> 
        </div>
    </div>
`;

let cartItem = (book) => `
    <li>
        <div class="dropdown-item" href="#">
        <a style="margin-right: 1em" id="remove-from-cart" name="${book.title}"> <i class="fas fa-x"></i> </a>
         ${book.title}, ${book.quantity} </a>
    </li>
`;

start();
