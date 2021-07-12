function renderMatrix(arr, node) {
  node.innerHTML = '';
  const frame = document.createElement('div');
  frame.classList.add('frame');
  const arrLength = arr.length;

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

export default renderMatrix;
