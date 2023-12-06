'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  app.route('/api/check')
    .post((req, res) => {
      const sudoku = new SudokuSolver(req.body.puzzle);

      sudoku.getRegion(req.body.puzzle)

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
