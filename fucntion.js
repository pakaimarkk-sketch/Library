const popUp = document.getElementById("open-form");
const popupWindow = document.getElementById("popup");
const close = document.getElementById("close");
const userForm = document.getElementById("userForm");
const finishedCheckbox = document.getElementById("finished");
const currPageDiv = document.getElementById("inputCurrPage");
const currPageInput = document.getElementById("currPage");
const libraryDiv = document.getElementById("library");
const authorInput = document.getElementById("author");  
const titleInput = document.getElementById("title");
const pagesInput = document.getElementById("pages");
const statusInput = finishedCheckbox;

currPageInput.addEventListener("input", () => {
    const pages = Number(pagesInput.value);
    let curr = Number(currPageInput.value);

    if (curr > pages) {
        currPageInput.value = pages;
        curr = pages;
    }

    finishedCheckbox.checked = curr != pages;
    
});

pagesInput.addEventListener("input", () => {
    const pages = Number(pagesInput.value);
    let curr = Number(currPageInput.value);

    if (curr > pages) {
        currPageInput.value = pages;
        curr = pages;
    }

    finishedCheckbox.checked = curr != pages;
    
});


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
    pages: Number(272),
    currPage: Number(272),
    finished: true
  },
];
let editingId = null;

let isEditing = false;
let cardBeingEdited = null;
let idBeingEdited = null;
myLibrary.forEach(book => renderBook(book))

popUp.addEventListener("click", openPopup);

close.addEventListener("click", closePopup); 

userForm.addEventListener("submit", createBook);

finishedCheckbox.addEventListener("change", toggleCurrentPage);

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
}

function toggleCurrentPage() {
    const checked = finishedCheckbox.checked;
    currPageDiv.style.display = checked ? "block" : "none";
    currPageInput.enabled = checked;
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
        pages: Number(data.get("pages")),
        currPage: Number(data.get("currPage")),
        status: data.get("finished") === "on",
};
};

function createBook(e) {
    e.preventDefault();
    
    const book = createBookObject(userForm);

    if (isEditing) {
    removeCard(cardBeingEdited, idBeingEdited);
    }

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
    <p>${data.title}</p>
    <p>Author: <br>${data.author}</p>
    <p>Pages:${data.pages} / ${data.currPage} </p>
    <button class="status" type="button">${data.finished ? "Finished" : "In Progress"}</button>
    <button class="delete" type="button">Delete</button>
    <button class="edit" type="button">Edit</button>
    `;

    libraryDiv.appendChild(card);

    const delBtn = card.querySelector(".delete");
    const editBtn = card.querySelector(".edit");
    const readBtn = card.querySelector(".status");

    delBtn.addEventListener("click", () => removeCard(card, data.id));
    editBtn.addEventListener("click", () =>  {
        const bookToEdit = myLibrary.find(b => b.id === data.id);
    card.querySelector(".status").addEventListener("click", () => {
        book.finished = !book.finished;
        card.querySelector(".status").textContent = book.finished ? "Finished" : "In Progress";
        card.querySelector("p:nth-child(3)").textContent = `Pages: ${updateCurrentPageDisplay(data)}`;
    });
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
        toggleCurrentPage()   
};
