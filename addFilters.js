export function sortByCategory(books, category) {
    if (category === "all") {
        return books;
    }
    return books.filter((book) => book.category === category);
}

export function sortByPrice(books, price) {
    if (price === "all") {
        return books;
    }
    const [min, max] = selectedPrice.split("-");
    return books.filter(
        (book) =>
            Number.parseFloat(book.price) >= min &&
            Number.parseFloat(book.price) <= max
    );
}

export function sortByAuthor(books, author) {
    if (author === "all") {
        return books;
    }
    return books.filter((book) => book.author === author);
}
