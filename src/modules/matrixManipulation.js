import floydWarhsall from './floydWarshall.js';

function generateMatrix(num) {
  const matrix = [];
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
  return matrix;
}

function generateResult(arr) {
  let resultMatrix = [];
  resultMatrix = floydWarhsall(arr);
  return resultMatrix;
}

async function generateMatrixFromFile(file) {
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

export { generateMatrix, generateResult, generateMatrixFromFile };
