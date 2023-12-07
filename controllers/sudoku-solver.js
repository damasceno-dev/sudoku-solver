class SudokuSolver {

  constructor(puzzleString) {
    this.validation = this.validate(puzzleString);
    this.arrayObject = this.getArrayObject(puzzleString)
    this.solution = this.solve(puzzleString, 0)
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
  getArrayObject(puzzleString, numberOfSkips, valueOfSkip) {
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

    for (let i = 0; i < numberOfSkips; i++) {
      console.log(numberOfSkips)
      console.log(puzzleArray.map(x => x.value).join(''))
      let indexToReplace = puzzleArray.findIndex(x => x.value === '.');
      console.log(indexToReplace)
      puzzleArray[indexToReplace].value = valueOfSkip;
      console.log(puzzleArray.map(x => x.value).join(''))
    }
    
    return puzzleArray;
  }

  getCoordinate(coord) {
    const values = coord.split('');
    if (values.length !== 2) {
      return "Invalid coordinate";
    }

    const enteredRow = values[0].toLowerCase().charCodeAt(0) - 96;
    const enteredColumn = Number(values[1]);
    
    if (isNaN(enteredColumn)) {
      return "Invalid coordinate";
    }
    if (enteredRow < 1 || enteredRow > 9 || enteredColumn < 1 || enteredColumn > 9) {
      return "Invalid coordinate";
    }

    return [enteredRow, enteredColumn]
  }


  checkRowPlacement( row, value) {    
    const rowToCheck = this.arrayObject.filter(x => x.row === row);
    if (rowToCheck.find(x => x.value === value.toString())) {
      return false;
    } else {
      return true;
    }
  }

  checkColPlacement( column, value) {
    const colToCheck = this.arrayObject.filter(x => x.col === column);
    if (colToCheck.find(x => x.value === value.toString())) {
      return false;
    } else {
      return true;
    }
  }

  checkRegionPlacement( row, column, value) {
    const region = this.getRegion(row, column);
    const regionToCheck = this.arrayObject.filter(x => x.region === region);
    if(regionToCheck.find(x => x.value === value.toString())) {
      return false;
    } else {
      return true;
    }
  }

  solvingAlgo(puzzleString, valueToCheck, valueOfSkip) {
    let skip = 0;
    let enterSkip = false;
    do {
    let indexToRevalidate = 0;
    let newValue = 0;
    this.arrayObject.every((element, ind) => {
      if (element.value === valueToCheck) {
        for (let i = 1; i< 10; i++) {
              if (this.checkColPlacement(element.col, i) &&
                   this.checkRowPlacement(element.row, i) &&
                   this.checkRegionPlacement(element.row, element.col, i)) {
                    indexToRevalidate = ind;
                    newValue = i.toString();
                    return false;
                  }
              else if (i=== 9) { //no solution
                    skip++;
                    enterSkip = true; //to enter the skip if and dont call
                    return false;
                  }
         }
      } else {
        return true;
      }
    })
    if (enterSkip)  {
      //try to solve the challenge starting from a different point ahead
      //mark x dots with skip, where x = skip
      this.arrayObject = this.getArrayObject(puzzleString, skip, valueOfSkip);
      enterSkip = false; //need to mark if it is to enter the skip (no solution) or not (solution is found)
    } else {
      //replace the dot for the solution
      this.arrayObject[indexToRevalidate].value = newValue;
    }
      //console.log(this.arrayObject.map(x => x.value).join(''))
    } while (this.arrayObject.find(el => el.value === valueOfSkip))
  //&& this.arrayObject.every(el => el.value !== 'T')
    console.log(this.arrayObject.map(x => x.value).join(''))
  }

  solve(puzzleString) {
    let iterations = 0;
    let valueToCheck = '.';
    let valueOfSkip = 'a';
    do {
      this.solvingAlgo(puzzleString, valueToCheck, valueOfSkip);
      valueToCheck = valueOfSkip;
      valueOfSkip = String.fromCharCode(valueOfSkip.charCodeAt(0) + 1)
      iterations++;
      console.log('array', this.arrayObject.map(x => x.value).join(''));
      console.log('iterations', iterations);
      console.log('valueToCheck', valueToCheck);
      console.log('valueOfSkip', valueOfSkip);
    } while (this.arrayObject.find(el => isNaN(Number(el.value))) && iterations <= 23)
  }
}

module.exports = SudokuSolver;

