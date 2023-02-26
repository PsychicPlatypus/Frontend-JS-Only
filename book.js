export function expandBook(element) {
    const button = element.querySelector("#overlay-button");
    const image = document.createElement("img");
    image.src = "https://picsum.photos/800/600";
    image.id = "book-image";

    button.addEventListener("click", () => {
        if (element.id !== "clicked-card") {
            const cardText = element.querySelector("#card-text");
            const cardTitle = element.querySelector("#card-title");
            const cardSubtitle = element.querySelector("#card-subtitle");
            const body = element.querySelector("#no-style");

            cardText.id = "card-text-selected";
            cardTitle.id = "card-title-selected";
            cardSubtitle.id = "card-subtitle-selected";
            body.id = "clicked-body";
            element.id = "clicked-card";
            return;
        }
        image.remove();
        const cardText = element.querySelector("#card-text-selected");
        const cardTitle = element.querySelector("#card-title-selected");
        const cardSubtitle = element.querySelector("#card-subtitle-selected");
        const body = element.querySelector("#clicked-body");

        cardText.id = "card-text";
        cardTitle.id = "card-title";
        cardSubtitle.id = "card-subtitle";
        body.id = "no-style";
        element.id = "base-card";
    });
}
