class SudokuSolver {

  validate(puzzleString) {

    if (puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }
    
    puzzleArray = puzzleString.split('');
    puzzleArray.forEach(element => {
      if (!/\d/.test(element) && !/./.test(element)) {
        return "Invalid characters in puzzle";
      }
    })

    return true;
  }

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

  checkRowPlacement(puzzleString, row, column, value) {    
    const rows = getRows(puzzleString)
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

