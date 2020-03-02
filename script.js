const button = document.querySelector("button");
const input = document.querySelector('input[type="file"]');
let fileName = document.querySelector(".fileName");
const preview = document.querySelector(".preview");
const dropBox = document.querySelector(".dropbox");
const header = document.querySelector(".header");

const fileDetails = input.files;
let fileCollection = [];
let fileList = [];
let itemToBeDisplayed = [];

function handleClick() {
  // header.innerHTML = "";  NOT WORKING ! WHY ?
  itemToBeDisplayed = [...new Set(fileList)];
  console.log(itemToBeDisplayed[0] === itemToBeDisplayed[1]);
  for (const files of fileDetails) {
    const img = document.createElement("img");
    imageURL = URL.createObjectURL(files);
    img.src = imageURL;
    img.classList.add("image");
    preview.insertAdjacentElement("beforeend", img);
  }
}

function handleEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

function checkDuplicate(file) {
  console.log(fileCollection.length);
  return fileCollection.length == 0 ? false : fileCollection.includes(file);
}

function displayitem(files = fileDetails) {
  header.innerHTML = "<b>Files to be Uploaded</b>";
  for (const item of files) {
    const result = checkDuplicate(item.name);
    result ? null : (fileName.innerHTML += `<p class='files'>${item.name}</p>`);
    fileCollection.push(item.name);
    fileList.push(item);
  }
}

function getFileInfo(event) {
  const data = event.dataTransfer;
  files = data.files;
  displayitem(files);
}

button.addEventListener("click", handleClick);

// Adding drag and drop event listener to the dropBox

["dragenter", "dragover", "drop"].forEach(item => {
  dropBox.addEventListener(item, handleEvent, false);
});

dropBox.addEventListener("drop", getFileInfo, false);
