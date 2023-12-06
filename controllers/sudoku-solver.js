class SudokuSolver {

  constructor(puzzleString) {
    console.log(puzzleString)
    this.validation = this.validate(puzzleString);
    this.cols = this.getColumns(puzzleString)
    this.rows = this.getRows(puzzleString)
  }

  validate(puzzleString) {

    if (puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }
    
    const puzzleArray = puzzleString.split('');
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

  getRegion(puzzleString) {
      let rowValue = 1;
      let colValue = 0;
    const puzzleArray = puzzleString.split('').map((el, ind) => {
      colValue++;
      if (ind > 8 && (ind % 9 === 0)) {
          rowValue++;
          colValue = 1;
      }
      return {row: rowValue, col: colValue, value: el}
    })
    console.log(puzzleArray)
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

