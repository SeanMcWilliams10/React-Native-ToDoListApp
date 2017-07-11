var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:password@localhost:5432/todoappdb';
debugger;
var db = pgp(connectionString);

// add query functions

function getAllTodos (req, res, next) {
    db.any('select * from todolists')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL ToDoLists'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleTodo (req, res, next) {
    var listID = parseInt(req.params.id);
    db.one('select * from todolists where listID = $1', listID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE ToDoList'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
/*
INSERT INTO public.todolists (listtitle, listobj)
	VALUES ('TestList0', '{todos:[task0, task1],nextId:0,showCompleted:true,editability:false}');
*/
function createTodo (req, res, next) {
    var listTitle = req.body.listTitle;
    var listObj = req.body.listObj;
    //console.log(req);
    //console.log(req.body);
    console.log(listTitle);
    console.log(listObj);
    var sqlString = "insert into todolists (listtitle, listobj) values ('"
        + listTitle + "', '" + listObj + "')";
    //"insert into todolists (listtitle, listobj) values ($listTitle, $listObj)", 
        //listTitle, listObj
    console.log(sqlString);
    db.none(sqlString)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one ToDoList'
                });
        })
        .catch(function (err) {
            console.log('create failed');
            return next(err);
        })
}

function updateTodo (req, res, next) {
    var listID = parseInt(req.params.id);
    db.none('update todolists set listtitle=$1, listobj=$2 where listID = $3',
        [req.body.listTitle, req.body.listObj, listiD])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated ToDoList'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeTodo (req, res, next) {
    var listID = parseInt(req.params.id);
    db.result('delete from todolists where listID = $1', listID)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} ToDoList'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
  getAllTodos: getAllTodos,
  getSingleTodo: getSingleTodo,
  createTodo: createTodo,
  updateTodo: updateTodo,
  removeTodo: removeTodo
};

/*
INSERT INTO public.todolists (listtitle, listobj)
	VALUES ('TestList0', '{todos:[task0, task1],nextId:0,showCompleted:true,editability:false}');
*/