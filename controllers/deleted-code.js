
getRows(puzzleString) {
    let row = []
    let rows = []
  puzzleString.split('').forEach((e, i) => {
    row.push(e)
    if (i > 7 && ((i + 1) % 9 === 0)) {
        rows.push(row);
      row = [];
    }
  })
  return rows;
}

getColumns(puzzleString) {
  const cols = Array.from({ length: 9 }, () => []);
  const rows = this.getRows(puzzleString);
  rows.forEach((arr, x) => {
    arr.forEach((e,i) => {
      cols[i].push(e)
    })
  })
  return cols;
}