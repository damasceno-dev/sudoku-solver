
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



do {
  puzzleString.split('').every(element => {
    if (element.value === '.') {
      for (let i = 1; i++; i< 10) {
        if(this.checkColPlacement(element.col, i) && 
          this.checkRowPlacement(element.row, i) && 
          this.checkRegionPlacement(element.row, element.col, i)) {

          }
      } 
    }
  })
} while (puzzleString.split('').find(el => el === '.' || el === 'N'))




do {
let indexToRevalidate = 0;
let newValue = 0;
this.arrayObject.every((element, ind) => {
  if (element.value === '.') {
    for (let i = 1; i< 10; i++) {
   //   if(this.checkColPlacement(element.col, i) && 
   //     this.checkRowPlacement(element.row, i) && 
   //     this.checkRegionPlacement(element.row, element.col, i)) {
    if (this.checkColPlacement(element.col, i) &&
         this.checkRowPlacement(element.row, i) &&
         this.checkRegionPlacement(element.row, element.col, i)) {
        indexToRevalidate = ind;
        newValue = i.toString();
          return false
        } 
    else if (i=== 9) {
          indexToRevalidate = ind;
          newValue = 'N';
          return false
        }
      }
  } else {
    return true;
  }
})

this.arrayObject[indexToRevalidate].value = newValue;

} while (this.arrayObject.find(el => el.value === '.') && this.arrayObject.every(el => el.value !== 'N'))