import { copyToClipBoard, pasteFromClipBoard } from './src/func-clipboard.js';

//create canvas
const canvas = document.getElementById('canvas1');
const paperScope = new paper.PaperScope();

///////////////////////////////////////////////////////////////////////////////
// settings
///////////////////////////////////////////////////////////////////////////////
let preferences = { animate: false };

initCanvas();
addEventListeners();

///////////////////////////////////////////////////////////////////////////////
// setup functions
///////////////////////////////////////////////////////////////////////////////

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = 'white';
  paperScope.setup(canvas);
  mainLoop();
}

function addEventListeners() {
  // Listen for window resize events
  window.addEventListener('resize', initCanvas);

  document.addEventListener('keydown', async (event) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.code == 'KeyC') await copyToClipBoard(paperScope);
      if (event.code == 'KeyV') {
        const text = await pasteFromClipBoard();
        if (text) {
          console.log('text', text);
        }
      }
    }
  });
}

function animationLoop() {
  mainLoop();
  if (preferences.animate) {
    requestAnimationFrame(animationLoop);
  }
}

///////////////////////////////////////////////////////////////////////////////
// update status
///////////////////////////////////////////////////////////////////////////////

function mainLoop() {
  drawBackground(paperScope, 'grey');
  drawRoundDot(paperScope, [paperScope.view.center.x, paperScope.view.center.y], 10, 'red');
}

///////////////////////////////////////////////////////////////////////////////
// functions
///////////////////////////////////////////////////////////////////////////////

// async function copyToClipBoard() {
//   //let data = 'Hello World';
//   let data = getSVGText(paperScope);
//   try {
//     await navigator.clipboard.writeText(data);
//     console.log('Copy Succeeded');
//   } catch (err) {
//     console.error('Fail, or user denied.');
//   }
// }

// async function pasteFromClipBoard() {
//   try {
//     const clipText = await navigator.clipboard.readText();
//     console.log('Paste Succeeded');
//     return clipText;
//   } catch (err) {
//     console.error('Fail, or user denied.');
//   }
// }

///////////////////////////////////////////////////////////////////////////////
// draw functions
///////////////////////////////////////////////////////////////////////////////

function drawBackground(scope, color) {
  drawRect(scope, [0, 0], [scope.view.size.width, scope.view.size.height], color);
}

function drawSquareDot(scope, value2_position, value_diameter, color) {
  drawRect(scope, [value2_position[0] - value_diameter / 2, value2_position[1] - value_diameter / 2], value_diameter, color);
}

function drawRoundDot(scope, value2_position, value_diameter, color) {
  drawEllipse(scope, [value2_position[0] - value_diameter / 2, value2_position[1] - value_diameter / 2], value_diameter, color);
}

function drawRect(scope, value2_position, value2_size, color) {
  const path = new scope.Path.Rectangle({
    point: value2_position,
    size: value2_size,
    fillColor: color,
  });
}

function drawEllipse(scope, value2_position, value2_size, color) {
  const path = new scope.Path.Ellipse({
    point: value2_position,
    size: value2_size,
    fillColor: color,
  });
}

//////////////////////////////////////////////////////////////////
// END
//////////////////////////////////////////////////////////////////

animationLoop();
