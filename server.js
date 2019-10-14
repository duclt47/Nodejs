var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');
var express = require('express');
var app = express();


app.listen(3000, function () {
    console.log('Listening on Port 3000');
});

db.serialize(function () {
    //create table
    db.run('CREATE TABLE Quotes(quote TEXT, author TEXT, year)');

    //insert values
    db.run('INSERT INTO Quotes VALUES ("Life is Short", "Unknown", 1902)');

});

app.get('/quotes', function (req, res) {
    console.log("hello")
    // db.all('SELECT * FROM Quotes', (err, row) => {
    //     if (err) {
    //         res.send(err);
    //     } else {
    //         res.send(row);
    //     }
    // })
});
app.get('/quotes/:id', function (req, res) {
    db.get('SELECT * FROM Quotes WHERE id = ?', req.id, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    });
});


app.post('/quotes', function (req, res) {
    res.send("Get request received at '/' ");
});

db.close();