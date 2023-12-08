'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  app.route('/api/check')
    .post((req, res) => {
      const sudoku = new SudokuSolver(req.body.puzzle);
      const coordinate = req.body.coordinate;
      const value = req.body.value;
      
      const [rowToCheck,columnToCheck] = sudoku.getCoordinate(coordinate);

      console.log(sudoku.solution)
      console.log(sudoku.arrayObject.map(x => x.value).join(''))

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) {
        return res.json('Required field missing')
      }
      const sudoku = new SudokuSolver(req.body.puzzle);
      const {validation, solution} = sudoku;
      if (!validation.result) {
        return res.json({error: validation.msg });
      }
      if (!solution) {
        return res.json({error: 'Puzzle cannot be solved'});
      }
      
      const solutionString = sudoku.arrayObject.map(x => x.value).join('');

      return res.json({solution: solutionString});
    });
};
