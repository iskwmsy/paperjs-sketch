// Copy & Paste
//export { copyToClipBoard, pasteFromClipBoard };

export async function copyToClipBoard(paperScope) {
  //let data = getSVGText();
  let data = getSVGText(paperScope);
  //let data = "Hello World";
  try {
    await navigator.clipboard.writeText(data);
    console.log('Copy Succeeded');
  } catch (err) {
    console.error('Fail, or user denied.');
  }
}

export async function pasteFromClipBoard() {
  try {
    const clipText = await navigator.clipboard.readText(); // Use await here and remove .then
    //console.log("Imported text from clipboard = " + clipText);
    console.log('Paste Succeeded');
    return clipText;
  } catch (err) {
    console.error('Fail, or user denied.');
  }
}

function getSVGText(scope) {
  return scope.project.exportSVG({ asString: true });
}

// function saveAsSVGFile() {
//   let fileName = "dim-export.svg";
//   let url = "data:image/svg+xml;utf8," + encodeURIComponent(getSVGText());
//   let link = document.createElement("a");
//   link.download = fileName;
//   link.href = url;
//   link.click();
// }
