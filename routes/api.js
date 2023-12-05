'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

const sudoku = new SudokuSolver();
module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log(req.body)

      sudoku.getColumns(req.body.puzzle)

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
