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

let myLibrary = [];
let editingId = null;

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
        pages: data.get("pages"),
        currPage: data.get("currPage"),
        status: data.get("finished") === "on",
};
};

function createBook(e) {
    e.preventDefault();
    
    const book = createBookObject(userForm);

    if (editingId) {
    document.querySelector(`[data-id="${editingId}"]`)?.remove();
    removeFromLibrary(editingId);
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

    const statusText = data.finished ? "Finished" : "In Progress";
    const pageDisplay = updateCurrentPageDisplay(data);

    card.innerHTML= `
    <p>${data.title}</p>
    <p>Author: <br>${data.author}</p>
    <p>Pages:${pageDisplay}</p>
    <button class="status" type="button">${statusText}</button>
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
        editCard(bookToEdit, data.id);
    })
    readBtn.addEventListener("click", () => {
        toggleReadStatus(readBtn, data);
    });
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

libraryDiv.addEventListener("click", (event) => {
    if (event.target.matches(".delete")) {
        event.target.closest(".card").remove();
    }
});

function toggleReadStatus(button, book) {
    if (book.finished) {
        book.finished = false;
        button.textContent = "In Progress";
    } else {
        book.finished = true;
        button.textContent = "Finished";
    }
};

function fillForm(book) {
        authorInput.value = book.author;
        titleInput.value = book.title;
        pagesInput.value = book.pages;
        currPageInput.value = book.currPage;
        statusInput.checked = book.finished;
        toggleCurrentPage()
        updateCurrentPageDisplay(book)
        
};

function updateCurrentPageDisplay(book) {
    if (book.finished) {
        currPageInput.value = `${book.pages}/${book.pages}`; 
    } else {
        currPageInput.value = `${book.currPage}/${book.pages}`;
    }
}