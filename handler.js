const helper = (function() {
  const input = document.querySelector("input[type='file']");
  const button = document.querySelector("button");
  const preview = document.querySelector("ul");
  const header = document.querySelector(".header");
  const displayImage = document.querySelector(".onload");
  const removeHeader = document.querySelector(".removeHeader");
  button.disabled = true;

  function clearFileName() {
    document.querySelector("input[name='files']").value = "";
    document.querySelector(".header").innerHTML = "";
    document.querySelector("ul").innerHTML = "";
    return;
  }

  function displayName(fileToBeUploadedList) {
    console.log("working");
    fileToBeUploadedList.length > 0
      ? (header.innerHTML = "<b>File Selected</b>")
      : null;
    fileToBeUploadedList.forEach(file => {
      html = `
            <li class='fileName'>${file.name}<button class='remove' id='${file.name}'>Remove</button></li>
            <br>
        `;
      preview.innerHTML += html;
    });
    button.disabled = false;
  }

  function restoreImage(file) {
    const img = document.createElement("img");
    img.dataset.filename = file.name;
    img.src = file.base64;
    displayImage.insertAdjacentElement("beforeend", img);
    img.addEventListener("click", removeImage);
  }

  function displayHeader(state) {
    state.length > 0
      ? (removeHeader.innerHTML = "<b>Click the Image to remove it!</b>")
      : null;
  }

  function clearHeader() {
    removeHeader.innerHTML = "";
  }

  function clearPreviewBox() {
    document
      .querySelector(".onload")
      .querySelectorAll("img")
      .forEach(item => item.remove());
    removeHeader.innerHTML = "Uploaded!";
    button.disabled = true;
  }

  function addListener() {
    input.addEventListener("change", onFileSelect);
    button.addEventListener("click", storeInLocalStorage);
    button.addEventListener("click", previewImage);
    preview.addEventListener("click", removeFilefromUploadList);
  }

  function displayStorageFull() {
    displayImage.innerHTML = "Upload Failed! Storage Exceed!";
  }
  return {
    clearFileName,
    displayName,
    restoreImage,
    clearHeader,
    displayHeader,
    clearPreviewBox,
    addListener,
    displayStorageFull
  };
})();
