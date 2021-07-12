const floydWarhsall = function (arr) {
  const res = [];

  for (let temparr of arr) {
    res.push(temparr.slice());
  }

  const arrLength = arr.length;

  for (let k = 0; k < arrLength; k++) {
    for (let i = 0; i < arrLength; i++) {
      for (let j = 0; j < arrLength; j++) {
        if (i == k || j == k) {
          continue;
        }
        res[i][j] = Math.min(res[k][j] + res[i][k], res[i][j]);
      }
    }
  }
  return res;
};

export default floydWarhsall;
