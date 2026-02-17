const popUp = document.getElementById("open-form");
const popupWindow = document.getElementById("popup");
const close = document.getElementById("close");
const userForm = document.getElementById("userForm");
const finishedCheckbox = document.getElementById("finished");
const currPageDiv = document.getElementById("inputCurrPage");
const currPageInput = document.getElementById("currPage");
const libraryDiv = document.getElementById("library");
let myLibrary = [];

popUp.addEventListener("click", openPopup);

close.addEventListener("click", closePopup); 

userForm.addEventListener("submit", createBook);

finishedCheckbox.addEventListener("change", toggleCurrentPage);

function openPopup() {
    popupWindow.classList.remove("hidden");
    popupWindow.style.display = "grid";
    enableEscClose()
};

function closePopup() {
    popupWindow.classList.add("hidden");
    popupWindow.style.display = "";
    userForm.reset();
    toggleCurrentPage();
};

function enableEscClose() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape"&& !popupWindow.classList.contains("hidden")) {
            closePopup();
        }
    });
}

function toggleCurrentPage() {
    const checked = finishedCheckbox.checked;
    currPageDiv.style.display = checked ? "none" : "block";
    currPageInput.disabled = checked;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

function createBookObject(form) {
    const data = new FormData(form);

    return {
        id: crypto.randomUUID(),
        author: data.get("author"),
        title: data.get("title"),
        pages: data.get("pages"),
        currPage: data.get("currPage"),
        finished: data.get("finished") === "on",
};
};

function createBook(e) {
    e.preventDefault();
    
    const book = createBookObject(userForm);
    addBookToLibrary(book);
    closePopup();
    userForm.reset();
    toggleCurrentPage();
    renderBook(book);
};

function renderBook(data) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML= `
    <p>${data.title}</p>
    <p>Author: ${data.author}</p>
    <p>Pages: ${data.pages}</p>
    <button class="delete" type="button">Delete</button>
    <button class="edit" type="button">Edit</button>
    `;
    libraryDiv.appendChild(card);
    const delBtn = card.querySelector(".delete");
    const editBtn = card.querySelector(".edit");

    delBtn.addEventListener("click", () => removeCard(card, data.id));

};
    
function removeCard(card, id) {
    card.remove();
    removeFromLibrary(id);
};

function editCard(card) {

};

function removeFromLibrary(id) {
    myLibrary = myLibrary.filter(book => book.id !==id);
};