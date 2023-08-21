import './style.css'

import Quill from "quill";
import * as quillTableUI from 'quill-table-ui'

import 'quill-table-ui/dist/index.css'

console.log('Quill',Quill);

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
Quill.register({
  'modules/tableUI': quillTableUI.default
}, true)
var bubble = new Quill('#bubble-container', {
  theme: 'bubble',
  modules: {
    table: true,
  }
});
var snow = new Quill('#snow-container', {
  theme: 'snow',
  modules: {
    table: true,
    tableUI: true
  }
});
console.log('snow quill',snow);
var output = new Quill('#output-container', {
  theme: 'bubble',
  modules: { table: true },
  readOnly: true,
})
bubble.on('text-change', function(delta, old, source) {
  if (source === 'user') {
    snow.updateContents(delta, 'api');
    updateOutput();
  }
});
const table = snow.getModule('table');
snow.on('text-change', function(delta, old, source) {
  if (source === 'user') {
    bubble.updateContents(delta, 'api');
    updateOutput();
  }
});

function updateOutput() {
  const bubbleContent = bubble.getContents();
  const snowContent = snow.getContents();
  // TODO compare
  output.setContents(bubbleContent);
  const outputContent = output.getContents();
  // TODO compare outputContent
}


document.querySelector('#insert-table').addEventListener('click', function() {
  table.insertTable(3, 3);
});

document.querySelector('#extract').addEventListener('click',()=>{
  console.log('snow.getContents()',snow.getSemanticHTML());
  
})

console.log('snow',snow);
// setupCounter(document.querySelector('#counter'))
