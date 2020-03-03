/* 
    TO-DO:
        Select filedetails and display it in the preview
        Provide feature to remove selected files before upload
        update the image array when the user remove a file.
        Store the filedetails in the localstorage
        on refresh display the image and provide a option delete to remove the image from dom and localstorage

*/

const button = document.querySelector("button");
const fileDetails = document.querySelector("input[name='files']").files;
const header = document.querySelector(".header");
const preview = document.querySelector("ul");
const displayImage = document.querySelector(".onload");
let fileToBeUploadedList = [];
let uniqueFile = [];
let image = [];
let state;

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function handler(event) {
  const files = event.target.files;
  for (const file of files) {
    const isDuplicateFile = checkDuplicate(file.name);
    if (!isDuplicateFile) {
      fileToBeUploadedList.push(file);
      objtobase64 = await toBase64(file);
      image.push(objtobase64);
    }
  }
  clearFileName();
  displayName();
}

function checkDuplicate(file) {
  return fileToBeUploadedList.map(item => item.name).includes(file);
}

function clearFileName() {
  document.querySelector("input[name='files']").value = "";
  document.querySelector(".header").innerHTML = "";
  document.querySelector("ul").innerHTML = "";
  return;
  //   displayName();
}

function displayName() {
  header.innerHTML = "<b>File Selected</b>";
  fileToBeUploadedList.forEach(file => {
    html = `
          <li class='fileName'>${file.name}<button class='remove' id='${file.name}'>Remove</button></li>
          <br>
      `;
    preview.innerHTML += html;
  });
}

function storeInLocalStorage() {
  clearFileName();
  localStorage.setItem("FilesObject", JSON.stringify(image));
  console.log("Stored in LS");
}

function restoreSession() {
  state = JSON.parse(localStorage.getItem("FilesObject"));
  if (state) {
    appendImage();
  }
}

function appendImage() {
  console.log("working");
  state.forEach(file => {
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = file;
    displayImage.append(img);
  });
}

function removeFile(event) {
  console.log(fileToBeUploadedList);
  const index = fileToBeUploadedList.findIndex(
    file => file.name == event.target.id
  );
  image.splice(index, 1);
  console.log(image);
  const newFileList = fileToBeUploadedList.filter(
    file => file.name != event.target.id
  );
  fileToBeUploadedList = newFileList;
  clearFileName();
  displayName();
}

button.addEventListener("click", storeInLocalStorage);
preview.addEventListener("click", removeFile);
restoreSession();
