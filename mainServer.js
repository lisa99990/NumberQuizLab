var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var database = require('./database')
let index = 0;
let score = 0;


app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "pug");


app.get('/', function (req, res) {

    res.render('index', {
        score: score,
        sequence: database.questions[index],
        index: index,
    });
});


app.post('/examine', (req, res) => {
    const body = req.body;
    let index = body.index;
    let score = body.score;

    if (body.answer == database.answers[index]) {
        ++score;
    }
    if (index == database.questions.length - 1) {
        res.render('result', {
            score: score,
            total: database.questions.length
        });

    } else {
        res.render('index', {
            score: score,
            index: ++index,
            sequence: database.questions[index]
        });
    }
});


var server = app.listen(8080, function () {
    console.log('Node server is running..');
});
