const popUp = document.getElementById("open-form");
const popupWindow = document.getElementById("popup");
const close = document.getElementById("close");
const userForm = document.getElementById("userForm");
const Checkbox = document.getElementById("finished");
const currPageDiv = document.getElementById("inputCurrPage");
const myLibrary = [];
const book = {};

popUp.addEventListener("click", (openPopup));

close.addEventListener("click", (closePopup)); 

Checkbox.addEventListener("change", (updateCurrentPageVisibility));

userForm.addEventListener("submit", createBook);

function openPopup() {
    popupWindow.classList.remove("hidden");
    popup.style.display = "grid";
};

function closePopup() {
    popupWindow.classList.add("hidden");
    popup.style.display = "";
};

function updateCurrentPageVisibility(isFinished) {
  currPageDiv.style.display = isFinished ? "none" : "grid";
};

function createBook(e) {
    e.preventDefault();
    const data = new FormData(userForm);
    const book = Object.fromEntries(data);
    console.log(book);
};

 

