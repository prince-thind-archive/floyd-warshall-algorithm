import './styles/style.css';
import './styles/matrix.css';
import floydWarhsall from './floydWarshall.js';

const DOMNodes = (function () {
  const numberForm = document.querySelector('#numberForm');
  const fileForm = document.querySelector('#fileForm');
  const generatedMatrix = document.querySelector('#generatedMatrix');
  const resultMatrix = document.querySelector('#resultMatrix');
  const root = document.querySelector(':root');

  return { root, numberForm, fileForm, generatedMatrix, resultMatrix };
})();

const mainModule = (function () {
  let matrix = [];
  let resultMatrix = [];

  DOMNodes.numberForm.addEventListener('submit', numberLogic);

  function numberLogic(e) {
    e.preventDefault();
    generateMatrix(DOMNodes.numberForm.number.value);
    generateResult(matrix);
    renderMatrices();
  }

  function renderMatrices() {
    renderMatrix(matrix, DOMNodes.generatedMatrix);
    renderMatrix(resultMatrix, DOMNodes.resultMatrix);
  }

  function renderMatrix(arr, node) {
    node.innerHTML = '';
    const frame = document.createElement('div');
    frame.classList.add('frame');
    const arrLength = arr.length;
    DOMNodes.root.style.setProperty('--side', arrLength);

    for (let i = 0; i < arrLength; i++) {
      for (let j = 0; j < arrLength; j++) {
        const matrixElement = document.createElement('div');
        matrixElement.classList.add('matrix-element');
        if (arr[i][j] == Infinity) {
          matrixElement.innerHTML = '∞';
        } else {
          matrixElement.innerText = arr[i][j];
        }
        frame.appendChild(matrixElement);
      }
    }
    node.appendChild(frame);
  }

  function generateMatrix(num) {
    matrix = [];
    for (let i = 0; i < num; i++) {
      const tempArr = [];
      for (let j = 0; j < num; j++) {
        const randomNumber = Math.trunc(Math.random() * 100);
        if (i == j) {
          tempArr.push(0);
        } else if (Math.trunc(Math.random() * 3) == 2) {
          tempArr.push(Infinity);
        } else {
          tempArr.push(randomNumber);
        }
      }
      matrix.push(tempArr);
    }
  }

  function generateResult(arr) {
    resultMatrix = [];
    resultMatrix = floydWarhsall(arr);
  }
})();
