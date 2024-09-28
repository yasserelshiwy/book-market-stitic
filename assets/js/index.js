// !=======> html element
let nameInpyt = document.getElementById("nameInput");
let urlInpyt = document.getElementById("urlInput");
let bookContainer = document.getElementById("bookContainer");
let deleted = document.getElementById("delete");
let nameRegex = /^[A-Z][a-z]{3,}$/;
let urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
let alerts = document.getElementById("alerts");
let inear = document.getElementById("inear");

// *=======> app variables
let bookList = [];
bookList = JSON.parse(localStorage.getItem("books")) || [];
displayAllBook();

// ^=======> functions

function addBook() {
  if (Validate(nameRegex, nameInpyt) && Validate(urlRegex, urlInpyt)) {
    let book = {
      name: nameInpyt.value,
      link: urlInpyt.value,
    };
    bookList.push(book);
    localStorage.setItem("books", JSON.stringify(bookList));
    displayBook(bookList.length - 1);
    clearForm();
  } else {
    inear.classList.remove("d-none");
    alerts.classList.remove("d-none");
  }
}
function closeInear() {
  inear.classList.add("d-none");
}

function displayBook(index) {
  var bookDisplay = `  <tr>
    <td class="index" >${[index + 1]}</td>
    <td class="name">${bookList[index].name}</td>
    <td>
      <button
        type="button"
        class="btn btn-vist d-flex justify-content-center align-items-center m-auto gap-2"
        onclick="vistLink(${index})"
      >
        <i class="fa-regular fa-eye"></i>visit
      </button>
    </td>
    <td>
      <button
        type="button"
        class="btn btn-delete d-flex justify-content-center align-items-center m-auto gap-2 btn-danger"
        onclick="deleteBook(${index})"
        id="deleted"
      >
        <i class="fa-regular fa-trash-can"></i>delete
      </button>
    </td>
  </tr>`;
  bookContainer.innerHTML += bookDisplay;
}
function displayAllBook() {
  for (let i = 0; i < bookList.length; i++) {
    displayBook(i);
  }
}
function clearForm() {
  nameInpyt.value = "";
  urlInpyt.value = "";
}
function vistLink(index) {
  window.open(bookList[index].link, `_blank`);
}

function deleteBook(i) {
  bookList.splice(i, 1);
  localStorage.setItem("books", JSON.stringify(bookList));
  bookContainer.innerHTML = "";
  displayAllBook();
}

function Validate(regex, elemenet) {
  if (regex.test(elemenet.value)) {
    elemenet.classList.add("is-valid");
    elemenet.classList.remove("is-invalid");
    return true;
  } else {
    elemenet.classList.add("is-invalid");
    elemenet.classList.remove("is-valid");
    return false;
  }
}
