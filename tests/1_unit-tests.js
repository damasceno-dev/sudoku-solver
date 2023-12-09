const chai = require('chai');
const assert = chai.assert;
const puzzleStrings = require('../controllers/puzzle-strings.js')
const SudokuSolver = require('../controllers/sudoku-solver.js');

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', () => {
    let sudoku;
    puzzleStrings.puzzlesAndSolutions.forEach(puzzleAndSolution => {
      
      let puzzle = puzzleAndSolution[0];
      let solution = puzzleAndSolution[1];
      
      sudoku = new SudokuSolver(puzzle)
      
      let hasSolution = sudoku.solve();
      let possibleSolution = sudoku.arrayObject.map(x => x.value).join('');
      
      assert.equal(hasSolution, true);
      assert.equal(possibleSolution, solution);
    })
  })

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const invalidPuzzleString1 = '1.5..2.84..63.12.7.2..5..ABCD..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const invalidPuzzleString2 = '1.5..2.84..63.12.7.2..5....0...1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const sudoku1 = new SudokuSolver(invalidPuzzleString1);
    const sudoku2 = new SudokuSolver(invalidPuzzleString2);
    assert.isFalse(sudoku1.validation.result);
    assert.equal(sudoku1.validation.msg, 'Invalid characters in puzzle')
    assert.isFalse(sudoku2.validation.result);
    assert.equal(sudoku2.validation.msg, 'Invalid characters in puzzle')
  })
  
  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const shortPuzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5';
    const longPuzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.519';
    const sudoku1 = new SudokuSolver(shortPuzzleString);
    const sudoku2 = new SudokuSolver(longPuzzleString);
    assert.isFalse(sudoku1.validation.result);
    assert.equal(sudoku1.validation.msg, 'Expected puzzle to be 81 characters long')
    assert.isFalse(sudoku2.validation.result);
    assert.equal(sudoku2.validation.msg, 'Expected puzzle to be 81 characters long')
  })
  
  test('Logic handles a valid row placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const coordinate = 'A1'
    const value = '2'
    const sudoku = new SudokuSolver(puzzleString);
    const coordinateObj = sudoku.getCoordinate(coordinate)
    const [rowToCheck,columnToCheck] = coordinateObj.values;
    const result = sudoku.checkRowPlacement(rowToCheck, value)
    
    assert.isTrue(result);
  })
  
  test('Logic handles an invalid row placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const coordinate = 'A1'
    const value = '9'
    const sudoku = new SudokuSolver(puzzleString);
    const coordinateObj = sudoku.getCoordinate(coordinate)
    const [rowToCheck,columnToCheck] = coordinateObj.values;
    const result = sudoku.checkRowPlacement(rowToCheck, value)
    
    assert.isFalse(result);
  })

  test('Logic handles a valid column placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const coordinate = 'A1'
    const value = '9'
    const sudoku = new SudokuSolver(puzzleString);
    const coordinateObj = sudoku.getCoordinate(coordinate)
    const [rowToCheck,columnToCheck] = coordinateObj.values;
    const result = sudoku.checkColPlacement(columnToCheck, value)

    assert.isTrue(result);
  })

  test('Logic handles an invalid column placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const coordinate = 'A1'
    const value = '8'
    const sudoku = new SudokuSolver(puzzleString);
    const coordinateObj = sudoku.getCoordinate(coordinate)
    const [rowToCheck,columnToCheck] = coordinateObj.values;
    const result = sudoku.checkColPlacement(columnToCheck, value)

    assert.isFalse(result);
  })

  test('Logic handles a valid region (3x3 grid) placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const coordinate = 'A1'
    const value = '1'
    const sudoku = new SudokuSolver(puzzleString);
    const coordinateObj = sudoku.getCoordinate(coordinate)
    const [rowToCheck,columnToCheck] = coordinateObj.values;
    const result = sudoku.checkRegionPlacement(rowToCheck, columnToCheck, value)

    assert.isTrue(result);
  })

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const coordinate = 'A1'
    const value = '2'
    const sudoku = new SudokuSolver(puzzleString);
    const coordinateObj = sudoku.getCoordinate(coordinate)
    const [rowToCheck,columnToCheck] = coordinateObj.values;
    const result = sudoku.checkRegionPlacement(rowToCheck, columnToCheck, value)

    assert.isFalse(result);
  })

  test('Valid puzzle strings pass the solver', () => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const sudoku = new SudokuSolver(puzzleString);
    const result = sudoku.solve()
    
    assert.isTrue(result);
  })

  test('Invalid puzzle strings fail the solver', () => {
    const unsolvablePuzzleString = '5168497323.76.5...8.97...65135.6.9.7472591..696847..5.253186.746842.75..791.5.6.8';
    const sudoku = new SudokuSolver(unsolvablePuzzleString);
    const result = sudoku.solve()
    
    assert.isFalse(result);
  })

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    let sudoku;
    puzzleStrings.puzzlesAndSolutions.forEach(puzzleAndSolution => {

      let puzzle = puzzleAndSolution[0];
      let solution = puzzleAndSolution[1];

      sudoku = new SudokuSolver(puzzle)

      let hasSolution = sudoku.solve();
      let possibleSolution = sudoku.arrayObject.map(x => x.value).join('');

      assert.equal(hasSolution, true);
      assert.equal(possibleSolution, solution);
    })
  })
  
});
