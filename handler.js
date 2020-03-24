const helper = (function() {
  const input = $("input[type='file']");
  const button = $("button");
  const preview = $("ul");
  const header = $(".header");
  const displayImage = $(".onload");
  const removeHeader = $(".removeHeader");
  button.prop("disabled", true);

  function clearFileName() {
    $('input[name="files"]').val("");
    $(".header").empty();
    $("ul").empty();
    return;
  }

  function displayName(fileToBeUploadedList) {
    fileToBeUploadedList.length > 0
      ? header.html("<b>File Selected</b>")
      : null;
    fileToBeUploadedList.forEach(file => {
      html = `
            <li class='fileName'>${file.name}<button class='remove' id='${file.name}'>Remove</button></li>
            <br>
        `;
      preview.append(html);
    });
    fileToBeUploadedList.length > 0
      ? button.prop("disabled", false)
      : button.prop("disabled", true);
  }

  function restoreImage(file) {
    const img = document.createElement("img");
    img.dataset.filename = file.name;
    img.src = file.base64;
    displayImage.append(img);
    $(document).on("click", "img", removeImage);
  }

  function displayHeader(state) {
    state.length > 0
      ? removeHeader.html("<b>Click the Image to remove it!</b>")
      : null;
  }

  function clearHeader() {
    removeHeader.empty();
  }

  function clearPreviewBox() {
    document
      .querySelector(".onload")
      .querySelectorAll("img")
      .forEach(item => item.remove());
    removeHeader.html("Uploaded!");
    button.prop("disabled", true);
  }

  function addListener() {
    input.change(onFileSelect);
    button.click(storeInLocalStorage);
    button.click(previewImage);
    preview.click(removeFilefromUploadList);
  }

  function displayStorageFull() {
    displayImage.text("Upload Failed! Storage Exceed!");
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
