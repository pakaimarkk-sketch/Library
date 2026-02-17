const popUp = document.getElementById("open-form");
const popupWindow = document.getElementById("popup");
const close = document.getElementById("close");
const userForm = document.getElementById("userForm");
const finishedCheckbox = document.getElementById("finished");
const currPageDiv = document.getElementById("inputCurrPage");
const currPageInput = document.getElementById("currPage");
const myLibrary = [];

popUp.addEventListener("click", (openPopup));

close.addEventListener("click", (closePopup)); 

userForm.addEventListener("submit", createBook);

finishedCheckbox.addEventListener("change", toggleCurrentPage);

function openPopup() {
    popupWindow.classList.remove("hidden");
    popup.style.display = "grid";
};

function closePopup() {
    popupWindow.classList.add("hidden");
    popup.style.display = "";
    userForm.reset();
    toggleCurrentPage()
};

function toggleCurrentPage() {
    const checked = finishedCheckbox.checked;
    currPageDiv.style.display = checked ? "none" : "block";
    currPageInput.disabled = checked;

}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

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

    const data = new FormData(userForm);
    const book = createBookObject(userForm)
    addBookToLibrary(book)
    closePopup()
    userForm.reset();
    toggleCurrentPage()
};

function renderBook(data) {
    const book = "";

    document.getElementById("library").innerHTML += book

};
    


