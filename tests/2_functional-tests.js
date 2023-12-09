const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('/api/solve tests', () => {
    
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/solve')
         .send({
           "puzzle": ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6",
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, "473891265851726394926345817568913472342687951197254638734162589685479123219538746");
          done();
        });
    })
    
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/solve')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Required field missing"}');
          done();
        });
    })

    
    test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/solve')         
         .send({
            "puzzle": ".7.89..yÖã5Ô¢..3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Invalid characters in puzzle"}');
          done();
        });
    })
    
    test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/solve')         
         .send({
            "puzzle": ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1.",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}');
          done();
        });
    })
    
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/solve')         
         .send({
            "puzzle": "5168497323.76.5...8.97...65135.6.9.7472591..696847..5.253186.746842.75..791.5.6.8",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Puzzle cannot be solved"}');
          done();
        });
    })

    
  })

  suite('/api/check tests', () => {

    test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
            "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
           "coordinate": "A1",
           "value": "7",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          console.log(res.text)
          assert.equal(res.text, '{"valid":true,"conflict":[]}');
          done();
        });
    })

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
            "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
           "coordinate": "A1",
           "value": "6",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"valid":false,"conflict":["column"]}');
          done();
        });
    })

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
            "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
           "coordinate": "A1",
           "value": "1",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"valid":false,"conflict":["row","column"]}');
          done();
        });
    })

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
            "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
           "coordinate": "A1",
           "value": "5",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"valid":false,"conflict":["row","column","region"]}');
          done();
        });
    })

    test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
            "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
           "value": "5",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Required field(s) missing"}');
          done();
        });
    })

    test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
             "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate": "!1",
            "value": "5",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Invalid coordinate"}');
          done();
        });
    })

    test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
             "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate": "A13",
            "value": "5",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Invalid coordinate"}');
          done();
        });
    })

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
             "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate": "A0",
            "value": "5",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Invalid coordinate"}');
          done();
        });
    })

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/check')         
         .send({
             "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate": "A1",
            "value": "52",
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Invalid value"}');
          done();
        });
    })

    
  })
});

