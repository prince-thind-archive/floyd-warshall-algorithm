import './styles/style.css';
import './styles/matrix.css';
import './styles/controls.css';

import { generateMatrix, generateResult, generateMatrixFromFile } from './modules/matrixManipulation.js';
import downloadCSV from './modules/downloadCSV.js';
import renderMatrix from './modules/renderMatrix.js';

const DOMNodes = (function () {
  const numberForm = document.querySelector('#numberForm');
  const fileForm = document.querySelector('#fileForm');
  const generatedMatrix = document.querySelector('#inputMatrix');
  const resultMatrix = document.querySelector('#resultMatrix');
  const download = document.querySelector('#download');
  const root = document.querySelector(':root');

  return { download, root, numberForm, fileForm, generatedMatrix, resultMatrix };
})();

const mainModule = (function () {
  let matrix = [];
  let resultMatrix = [];

  DOMNodes.numberForm.addEventListener('submit', numberLogic);
  DOMNodes.fileForm.addEventListener('submit', fileLogic);
  DOMNodes.download.addEventListener('click', downloadFile);

  function numberLogic(e) {
    e.preventDefault();
    matrix = generateMatrix(DOMNodes.numberForm.inputNumber.value);
    resultMatrix = generateResult(matrix);
    renderMatrices();
  }
  function fileLogic(e) {
    e.preventDefault();
    const arrPromise = generateMatrixFromFile(DOMNodes.fileForm.inputFile.files[0]);
    arrPromise.then((arr) => {
      matrix = arr;
      resultMatrix = generateResult(arr);
      renderMatrices();
    });
  }

  function downloadFile() {
    downloadCSV(resultMatrix);
  }

  function renderMatrices() {
    renderMatrix(matrix, DOMNodes.generatedMatrix);
    renderMatrix(resultMatrix, DOMNodes.resultMatrix);
    DOMNodes.root.style.setProperty('--side', matrix.length);
  }
})();
