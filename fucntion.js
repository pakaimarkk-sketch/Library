const popUp = document.getElementById("open-form");
const popupWindow = document.getElementById("popup");
const close = document.getElementById("close");
const userForm = document.getElementById("userForm");
const inProgressCheckbox = document.getElementById("finished");
const currPageDiv = document.getElementById("inputCurrPage");
const currPageInput = document.getElementById("currPage");
const libraryDiv = document.getElementById("library");
const authorInput = document.getElementById("author");  
const titleInput = document.getElementById("title");
const pagesInput = document.getElementById("pages");
const statusInput = inProgressCheckbox;

let myLibrary = [
    {
    id: crypto.randomUUID(),
    title: "Kybalion",
    author: "William Walker Atkinson",
    pages: 96,
    currPage: 72,
    finished: false
  },
  {
    id: crypto.randomUUID(),
    title: "Rethink Yourself: Change Your Thinking (Not Yourself) to Build Your Self-Esteem",
    author: "Zach Leezer",
    pages: 200,
    currPage: 200,
    finished: true
  },
  {
    id: crypto.randomUUID(),
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    pages: 272,
    currPage: 272,
    finished: true
  },
];

currPageInput.addEventListener("input", toggleCurrentPage);

pagesInput.addEventListener("input", toggleCurrentPage);

let editingId = null;
let isEditing = false;
let cardBeingEdited = null;
let idBeingEdited = null;

myLibrary.forEach(book => renderBook(book));

popUp.addEventListener("click", openPopup);

close.addEventListener("click", closePopup); 

userForm.addEventListener("submit", createBook);

inProgressCheckbox.addEventListener("change", toggleCurrentPage);

function openPopup() {
    popupWindow.classList.remove("hidden");
    popupWindow.style.display = "grid";
    enableEscClose()
    toggleCurrentPage()
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
};

function toggleCurrentPage() {
    const clamped = clampCurrPage()

};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

function createBookObject(form) {
    const data = new FormData(form);
    const pages = Number(data.get("pages")) || 0;
    const inProgress = data.get("finished") === "on";

    return {
        id: crypto.randomUUID(),
        author: data.get("author"),
        title: data.get("title"),
        pages: Number(data.get("pages")),
        currPage: inProgress ? Number(data.get("currPage")) || 0 : pages,
        finished: !inProgress, 
    };
};

function createBook(e) {
    e.preventDefault();
    
    const book = createBookObject(userForm);

    if (isEditing) {
    removeCard(cardBeingEdited, idBeingEdited);
    };

    addBookToLibrary(book);
    renderBook(book);

    editingId = null;
    closePopup();
    userForm.reset();
    toggleCurrentPage();
};

function renderBook(data) {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML= `
    <p id="title">${data.title}</p>
    <p id="author">Author: <br>${data.author}</p>
    <p id="pages">Pages:${data.pages} / ${data.currPage} </p>
    <div id="cardBtns">
    <button class="delete" type="button">Delete</button>
    <button class="edit" type="button">Edit</button>
    </div>
    <div id="statusbarContainer">
    <progress class="progress" value="0" max="1"></progress>
    <p class="statusText"></p>
    </div>
    `;

    libraryDiv.appendChild(card);

    const progressBar = card.querySelector(".progress");
    const statusText = card.querySelector(".statusText");
    
    const delBtn = card.querySelector(".delete");
    const editBtn = card.querySelector(".edit");
    const readBtn = card.querySelector(".status");
    updateStatusbar(data, progressBar, statusText);
    delBtn.addEventListener("click", () => removeCard(card, data.id));
    editBtn.addEventListener("click", () =>  {
        const bookToEdit = myLibrary.find(b => b.id === data.id);

        isEditing = true;
        cardBeingEdited = card;
        idBeingEdited = data.id;
        editCard(bookToEdit, data.id);
    })
    
};
    
function removeCard(card, id) {
    card.remove();
    removeFromLibrary(id);
};

function editCard(book, id) {
    openPopup();
    fillForm(book);
};

function removeFromLibrary(id) {
    myLibrary = myLibrary.filter(book => book.id !==id);
};

function fillForm(book) {
        authorInput.value = book.author;
        titleInput.value = book.title;
        pagesInput.value = book.pages;
        currPageInput.value = book.currPage;
        statusInput.checked = book.finished;
        inProgressCheckbox.checked = !book.finished;
        toggleCurrentPage();   
};


function updateStatusbar(data, progressBar, statusText) {
    const pages = Number(data.pages);
    const currPage = Number(data.currPage);
    const clamped = Math.min(currPage, pages);
    const isFinished = clamped === pages && pages > 0;

    progressBar.value = pages ? clamped / pages : 0;

    statusText.textContent = isFinished ? "Finished" : "In Progress";

    return isFinished;
}

function clampCurrPage() {
    const pages = Number(pagesInput.value) || 0;
    let curr = Number(currPageInput.value) || 0;

    if (curr > pages) curr = pages;
    currPageInput.value = curr;

    const inProgress = inProgressCheckbox.checked;
    currPageDiv.style.display = inProgress ? "block" : "none";
    currPageInput.disabled = !inProgress;

    return curr;
}

