'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  app.route('/api/check')
    .post((req, res) => {
      
      if(!req.body.coordinate || !req.body.value || !req.body.puzzle) {
        return res.json({error: 'Required field(s) missing'})
      }
      
      const coordinate = req.body.coordinate;
      const value = req.body.value;
      const sudoku = new SudokuSolver(req.body.puzzle);
      const validation = sudoku.validation; 
      
      if (!validation.result) {
        return res.json({error: validation.msg });
      }
      
      const coordinateObj = sudoku.getCoordinate(coordinate)
      if (!coordinateObj.result) {
        return res.json({error: coordinateObj.msg });
      }

      if (isNaN(Number(value)) || value < 1 || value > 9) {
        return res.json({error: 'Invalid value'})
      }
      
      const [rowToCheck,columnToCheck] = coordinateObj.values;
      
      return res.json(sudoku.checkPlacement(rowToCheck, columnToCheck, value))
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      const sudoku = new SudokuSolver(req.body.puzzle);
      const validation = sudoku.validation;
      const solution = sudoku.solve();
      
      if (!validation.result) {
        return res.json({ error: validation.msg});
      }
      if (!solution) {
        return res.json({error: 'Puzzle cannot be solved'});
      }
      
      const solutionString = sudoku.arrayObject.map(x => x.value).join('');

      return res.json({solution: solutionString});
    });
};
