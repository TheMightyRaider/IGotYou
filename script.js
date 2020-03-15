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
let images = [];
let state = [];
let savedImage = [];

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
    }
    const checkDuplicateinLocalStorage = checkDuplicate(images, file.name);
    !checkDuplicateinLocalStorage ? images.push(imgobj) : null;
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
  try {
    localStorage.setItem("FilesObject", JSON.stringify(images));
  } catch (err) {
    helper.displayStorageFull();
  }

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
    savedImage.push(file); // storing the images from the localStorage.
  });
}

function removeImage(event) {
  if (savedImage.length == 0) {
    images.forEach(file => savedImage.push(file));
  }
  if (
    savedImage.length == 1
    // Could have used image array
    // !event.target.nextSibling &&
    // event.target.previousSibling.nodeType == Node.TEXT_NODE
  ) {
    helper.clearHeader();
  }
  const filename = event.target.dataset.filename;
  newImageList = savedImage.filter(file => file.name != filename);
  images = newImageList;
  savedImage = newImageList;
  storeInLocalStorage();
  event.target.remove();
}

function removeFilefromUploadList(event) {
  const newimage = images.filter(file => file.name != event.target.id);
  images = newimage;
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
    imageobj = {
      name: file.name,
      base64: await toBase64(file)
    };
    helper.restoreImage(imageobj);
  });
  fileToBeUploadedList = [];
}
helper.addListener();
restoreSession();
