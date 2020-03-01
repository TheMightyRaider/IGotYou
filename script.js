const button = document.querySelector("button");
const input = document.querySelector('input[type="file"]');
let fileName = document.querySelector(".fileName");
const preview = document.querySelector(".preview");

const fileDetails = input.files;

function handleClick(event) {
  fileName.remove();
  for (const files of fileDetails) {
    const img = document.createElement("img");
    imageURL = URL.createObjectURL(files);
    img.src = imageURL;
    img.classList.add("image");
    preview.insertAdjacentElement("beforeend", img);
  }
}

function displayitem() {
  fileName.insertAdjacentHTML("afterbegin", "<b>Files to be Uploaded</b>");
  for (const item of fileDetails) {
    fileName.insertAdjacentHTML("beforeend", `<p>${item.name}</p>`);
  }
}

button.addEventListener("click", handleClick);
