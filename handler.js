const helper = (function() {
  const preview = document.querySelector("ul");
  const header = document.querySelector(".header");
  const displayImage = document.querySelector(".onload");
  const removeHeader = document.querySelector(".removeHeader");

  function clearFileName() {
    document.querySelector("input[name='files']").value = "";
    document.querySelector(".header").innerHTML = "";
    document.querySelector("ul").innerHTML = "";
    return;
  }

  function displayName(fileToBeUploadedList) {
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

  function checkToRemoveHeader(event) {
    if (
      // Could have used image array
      !event.target.nextSibling &&
      event.target.previousSibling.nodeType == Node.TEXT_NODE
    ) {
      removeHeader.innerHTML = "";
    }
  }

  function generatePreviewImage(src) {
    const img = document.createElement("img");
    img.src = src;
    document.querySelector(".images").insertAdjacentElement("beforeend", img);
  }

  function clearPreviewBox() {
    document
      .querySelector(".images")
      .querySelectorAll("img")
      .forEach(item => item.remove());
    document.querySelector(".uploadedHeader").innerHTML = "Uploaded !";
  }

  function addListener() {
    const button = document.querySelector("button");

    button.addEventListener("click", storeInLocalStorage);
    button.addEventListener("click", previewImage);
    preview.addEventListener("click", removeFilefromUploadList);
  }
  return {
    clearFileName,
    displayName,
    restoreImage,
    checkToRemoveHeader,
    displayHeader,
    generatePreviewImage,
    clearPreviewBox,
    addListener
  };
})();
