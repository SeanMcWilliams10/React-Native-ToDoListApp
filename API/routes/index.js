var express = require('express');
var router = express.Router();


var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressss' });
});

router.get('/todosapi', db.getAllTodos);
router.get('/todosapi/:id', db.getSingleTodo);
router.post('/todosapi', db.createTodo);
router.put('/todosapi/:id', db.updateTodo);
router.delete('/todosapi/:id', db.removeTodo);

module.exports = router;

//pp.listen(3000);