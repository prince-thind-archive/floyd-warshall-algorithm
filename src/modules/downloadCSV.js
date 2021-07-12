function downloadCSV(resultMatrix) {
  let resultString = '';
  for (let arr of resultMatrix) {
    resultString += arr;
    resultString += '\n';
  }
  pushFile('data.csv', resultString);

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

export default downloadCSV;
