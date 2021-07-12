import './styles/style.css';
import './styles/matrix.css';
import floydWarhsall from './floydWarshall.js';

const DOMNodes = (function () {
  const numberForm = document.querySelector('#numberForm');
  const fileForm = document.querySelector('#fileForm');
  const generatedMatrix = document.querySelector('#generatedMatrix');
  const resultMatrix = document.querySelector('#resultMatrix');
  const downlaod = document.querySelector('#downlaod');
  const root = document.querySelector(':root');

  return { download, root, numberForm, fileForm, generatedMatrix, resultMatrix };
})();

const mainModule = (function () {
  let matrix = [];
  let resultMatrix = [];

  DOMNodes.numberForm.addEventListener('submit', numberLogic);
  DOMNodes.fileForm.addEventListener('submit', fileLogic);
  DOMNodes.download.addEventListener('click', downloadFile);

  function downloadFile() {
    let resultString='';
    for(let arr of resultMatrix){
      resultString+=arr;
      resultString+='\n';
    }

    pushFile('data.csv',resultString);

    function pushFile(filename, text) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }

  function numberLogic(e) {
    e.preventDefault();
    generateMatrix(DOMNodes.numberForm.number.value);
    generateResult(matrix);
    renderMatrices();
  }

  function fileLogic(e) {
    e.preventDefault();
    generateMatrixFromFile(DOMNodes.fileForm.file.files[0]);
  }

  function generateMatrixFromFile(file) {
    loadFile(file).then((arr) => {
      matrix = arr;
      generateResult(matrix);
      renderMatrices();
    });

    async function loadFile(file) {
      const text = await new Response(file).text();
      const resArr = [];
      const stringArr = text.split('\n');
      stringArr.pop();
      for (let tempArr of stringArr) {
        tempArr = tempArr.split(',');
        tempArr.forEach((e, i) => {
          tempArr[i] = +e;
        });
        resArr.push(tempArr);
      }
      return resArr;
    }
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
