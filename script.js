const input = document.querySelector('input[name="uploadFile"]');
const fileDetails = input.files;
let fileList = [];

function displayImage() {
  lib.clearFileNames();
  console.log(fileList);
  for (const file of fileList) {
    lib.appendImage(file);
  }
  fileList = [];
  console.log(fileList);
}

function checkDuplicate(file) {
  return fileList.map(item => item.name).includes(file);
}

function displayitem(files = fileDetails) {
  for (const item of files) {
    const isFileValid = checkDuplicate(item.name);
    if (!isFileValid) {
      lib.appendFileName(item.name);
      fileList.push(item); //Single source of truth
    }
  }
}

function getFileInfo(event) {
  const data = event.dataTransfer;
  files = data.files;
  displayitem(files);
}

lib.addDisplayHandler(displayImage);
lib.addDropHandler(getFileInfo);
