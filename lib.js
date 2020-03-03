const lib = (function() {
  //IIFE
  function appendImage(file) {
    document.querySelector(".previewHeader").innerHTML = "PREVIEW";
    const preview = document.querySelector(".preview");
    const img = document.createElement("img");
    const imageURL = URL.createObjectURL(file);
    img.src = imageURL;
    img.classList.add("image");
    preview.appendChild(img);
  }

  function appendFileName(fileName) {
    document.querySelectorAll(".image").forEach(item => item.remove());
    const header = document.querySelector(".header");
    let fileNameContainer = document.querySelector(".fileName");
    header.innerHTML = "<b>Files to be Uploaded</b>";
    fileNameContainer.innerHTML += `<p class='files'>${fileName}</p>`;
  }

  function clearFileNames() {
    document.querySelector('input[name="uploadFile"]').value = "";
    document.querySelector(".header").innerHTML = "";
    document.querySelectorAll(".files").forEach(item => item.remove());
  }

  function addDisplayHandler(handler) {
    const button = document.querySelector("button");
    button.addEventListener("click", handler);
  }

  function stopDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function addDropHandler(handler) {
    const dropBox = document.querySelector(".dropbox");
    ["dragenter", "dragover", "drop"].forEach(item => {
      dropBox.addEventListener(item, stopDefaults, false);
    });

    dropBox.addEventListener("drop", handler, false);
  }

  //   function getButton(){
  //       return document.querySelector('button')
  //   }

  /*METHOD 1: 
    lib.getbutton().addEventListener(handler);

    METHOD 2:
    lib.addDropEventListener(handler);
    lib.addDisplayHandler(d)
  */

  return {
    appendImage,
    appendFileName,
    clearFileNames,
    addDisplayHandler,
    addDropHandler
  };
})();
