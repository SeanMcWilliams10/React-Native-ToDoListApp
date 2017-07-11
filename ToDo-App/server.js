const massive        = require('massive');
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./db');

const app = express();

const port = 5432;

//app.use(bodyParser.urlencoded({ extended: true }));

massive({
    host: 'localhost',
    port: 5432,
    database: 'todoappdb',
    user: 'postgres',
    password: 'password'
}).then(db => {
    db.saveDoc('todoLists', {
        
    })
})
/*
MongoClient.connect(db.url, (err, database) => {
    if (err){
        console.log('Server Connect error');
        return console.log(err);
    }
    require('./routes')(app, database);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})
*/

