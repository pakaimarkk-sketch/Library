const popUp = document.getElementById("open-form")
const popupWindow = document.getElementById("popup")
const close = document.getElementById("close")
const userForm = document.getElementById("userForm")
const finishedCheckbox = document.getElementById("finished");
const currPageDiv = document.getElementById("inputCurrPage");
const myLibrary = [];
const book = {}





close.addEventListener("click", () => {
    popupWindow.classList.add("hidden")
    popup.style.display = "";
}  ); 

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(userForm);
    const book = Object.fromEntries(data);

    let markup ="";
    for (key in book) {
        markup +=` 
        <div>
            <span>${key}: ${book[key]}</span>
        </div>
        `;
    }

    document.getElementById("library").innerHTML += markup;
    
    userForm.reset();
    popup.classList.add("hidden");
    popup.style.display = "";
    finishedCheckbox.checked = false;
    currPageDiv.style.display = "grid";
}  );

finishedCheckbox.addEventListener("change", () => {
    if (finishedCheckbox.checked) {
        currPageDiv.style.display = "none";
    } else {
        currPageDiv.style.display = "grid";
    }
});

popUp.addEventListener("click", () => {
        popupWindow.classList.remove("hidden")
        popup.style.display = "grid";
}  );