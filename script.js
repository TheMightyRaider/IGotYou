/* 
    TO-DO:
        Select filedetails and display it in the preview
        Provide feature to remove selected files before upload
        update the image array when the user remove a file.
        Store the filedetails in the localstorage
        on refresh display the image and provide a option delete to remove the image from dom and localstorage
        Add remove feature to remove the image after reload.

*/

let fileToBeUploadedList = [];
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

async function onFileSelect(event) {
  const files = event.target.files;
  for (const file of files) {
    const isDuplicateFile = checkDuplicate(fileToBeUploadedList, file.name);
    if (!isDuplicateFile) {
      fileToBeUploadedList.push(file);
      objtobase64 = await toBase64(file);
      imgobj = {
        name: file.name,
        base64: objtobase64
      };
      const checkDuplicateinLocalStorage = checkDuplicate(image, file.name);
      !checkDuplicateinLocalStorage ? image.push(imgobj) : null;
    }
  }
  helper.clearFileName();
  helper.displayName(fileToBeUploadedList);
}

function checkDuplicate(folder, file) {
  return folder.map(item => item.name).includes(file);
}

function storeInLocalStorage() {
  // displayImage.innerHTML = "";
  helper.clearFileName();
  localStorage.setItem("FilesObject", JSON.stringify(image));
  console.log("Stored in LS");
}

function restoreSession() {
  state = JSON.parse(localStorage.getItem("FilesObject"));
  if (state) {
    restoreImageOnReload();
  }
}

function restoreImageOnReload() {
  helper.displayHeader(state);
  state.forEach(file => {
    helper.restoreImage(file);
    image.push(file);
  });
}

function removeImage(event) {
  helper.checkToRemoveHeader(event);
  const filename = event.target.dataset.filename;
  newimage = image.filter(file => file.name != filename);
  image = newimage;
  storeInLocalStorage();
  event.target.remove();
}

function removeFilefromUploadList(event) {
  const index = fileToBeUploadedList.findIndex(
    file => file.name == event.target.id
  );
  image.splice(index, 1);
  const newFileList = fileToBeUploadedList.filter(
    file => file.name != event.target.id
  );
  fileToBeUploadedList = newFileList;
  helper.clearFileName();
  helper.displayName(fileToBeUploadedList);
}

function previewImage() {
  helper.clearPreviewBox();
  fileToBeUploadedList.forEach(async file => {
    event.target.dataset.filename;
    const base64 = await toBase64(file);
    helper.generatePreviewImage(base64);
  });
  fileToBeUploadedList = [];
}
helper.addListener();
restoreSession();
