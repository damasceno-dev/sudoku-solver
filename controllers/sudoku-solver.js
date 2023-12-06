class SudokuSolver {

  constructor(puzzleString) {
    this.validation = this.validate(puzzleString);
    this.arrayObject = this.getArrayObject(puzzleString)
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

  getRegion(row, col) {
    if (row <= 3 && col <= 3) {
      return 1;
    } else if ( row <= 3 && col >= 4 && col <= 6) {
      return 2;
    } else if ( row <= 3 && col >=7) {
      return 3;
    } else if ( row >= 4 && row <= 6 && col <= 3) {
      return 4;
    } else if (row >= 4 && row <= 6 && col >= 4 && col <= 6) {
      return 5;
    } else if (row >= 4 && row <= 6 && col >=7) {
      return 6;
    } else if (row >=7 && col <= 3) {
      return 7;
    } else if (row >=7 && col >= 4 && col <= 6) {
      return 8;
    } else if (row >=7 && col >=7) {
      return 9;
    }
  }
  getArrayObject(puzzleString) {
      let rowValue = 1;
      let colValue = 0;
    const puzzleArray = puzzleString.split('').map((el, ind) => {
      colValue++;
      if (ind > 8 && (ind % 9 === 0)) {
          rowValue++;
          colValue = 1;
      }
      return {row: rowValue, col: colValue, region: this.getRegion(rowValue, colValue), value: el}
    })

    return puzzleArray;
  }

  getCoordinate(coord) {
    const values = coord.split('');
    if (values.length !== 2) {
      return "Invalid coordinate";
    }

    const enteredRow = values[0].toLowerCase().charCodeAt(0) - 96;
    const enteredColumn = Number(values[1]);
    console.log(enteredRow);
    console.log(enteredColumn);
    
    if (isNaN(enteredColumn)) {
      return "Invalid coordinate";
    }
    if (enteredRow < 1 || enteredRow > 9 || enteredColumn < 1 || enteredColumn > 9) {
      return "Invalid coordinate";
    }

    return [enteredRow, enteredColumn]
  }


  checkRowPlacement(row, value) {    
    const rowToCheck = this.arrayObject.filter(x => x.row === row);
    if (rowToCheck.find(x => x.value === value)) {
      return false;
    } else {
      return true;
    }
  }

  checkColPlacement(column, value) {
    const colToCheck = this.arrayObject.filter(x => x.col === column);
    console.log(colToCheck)
    if (colToCheck.find(x => x.value === value)) {
      return false;
    } else {
      return true;
    }
  }

  checkRegionPlacement(row, column, value) {
    const region = this.getRegion(row, column);
    const regionToCheck = this.arrayObject.filter(x => x.region === region);
    if(regionToCheck.find(x => x.value === value)) {
      return true;
    } else {
      return false;
    }
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

