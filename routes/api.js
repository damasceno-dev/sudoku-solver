'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  app.route('/api/check')
    .post((req, res) => {
      const sudoku = new SudokuSolver(req.body.puzzle);
      const coordinate = req.body.coordinate;
      const value = req.body.value;
      
      const [rowToCheck,columnToCheck] = sudoku.getCoordinate(coordinate);

      console.log(sudoku.checkColPlacement(columnToCheck, value))
      console.log(sudoku.checkRowPlacement(rowToCheck, value))
      console.log(sudoku.checkRegionPlacement(rowToCheck, columnToCheck, value))

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
