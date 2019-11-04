"use strict";
(() => {
  const input = document.querySelector(".input-js");
  const button = document.querySelector(".button-js");
  const clearFile = document.querySelector(".clear-file-js");

  let result = document.querySelector(".result-js");

  clearFile.addEventListener("click", readBlob);
  button.addEventListener("click", clearCode);

  function clearCode() {
    const codeJs = input.value;
    const res = codeJs
      .replace(/\/\/.*|\/\*[^]*?\*\//g, "")
      .replace(/\s\s+/g, " ");
    result.textContent = res;
  }

  // for load file
  function readBlob() {
    const files = document.querySelector(".load-file").files;
    if (!files.length) {
      alert("Please select a file!");
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        result.textContent = evt.target.result
          .replace(/\/\/.*|\/\*[^]*?\*\//g, "")
          .replace(/\s\s+/g, " ");

        const text = encodeURIComponent(result.textContent);
        const root = document.querySelector(".root");
        root.innerHTML = `<a class="link" href="data:text/plain;charset=utf-8,%EF%BB%BF  ${text}"  download="text.js" >скачать файл</a>`;
      }
    };
    let blob = file.slice(0, file.size - 1);
    reader.readAsBinaryString(blob);
  }
})();
