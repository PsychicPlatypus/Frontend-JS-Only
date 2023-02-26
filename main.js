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

function addFilters() {
    const filterList = document.getElementById("filter-container");
    const filters = [
        {
            name: "category",
            options: categories,
            callback: (category) => {
                if (category.length) {
                    chosenCategory = category;
                    displayBooks();
                    return;
                }
                chosenCategory = "All";
                displayBooks();
            },
        },
        {
            name: "author",
            options: authors,
            callback: (author) => {
                if (author.length) {
                    chosenAuthor = author;
                    displayBooks();
                    return;
                }
                chosenAuthor = "All";
                displayBooks();
            },
        },
        {
            name: "price",
            options: prices,
            callback: (price) => {
                if (price.length) {
                    chosenPrice = price;
                    displayBooks();
                    return;
                }
                chosenPrice = "All";
                displayBooks();
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
}

let bookCard = (book) => `
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

start();
