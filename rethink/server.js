var express = require('express');
var app = express();
var r = require('rethinkdb');

var bodyParser = require('body-parser');
//connect to mongodb database 
var connection = null;
r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
    if (err) throw err;
    connection = conn;
})

var router = express.Router();

//add middlewares 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//add route
app.use('/', router);

//var emp = new EmpSchema();

//start server
app.listen('3000');
console.log("server is strted on 3000");

//get request method
router.get('/', function (req, res) {
    // res.json({ "message": "service is started" });
    r.db('Employee').table('emp').run(connection, function (err, cursor) {
        if (err) throw err;

        var csr = cursor.toArray(function (err, rslt) {
            res.json(csr._settledValue);
        });

    });
});

//post request method
router.post('/', function (req, res) {


    r.db('Employee').table('emp').insert([
        {
            name: req.body.name,
            address: req.body.address
        }]).run(connection, function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        })


});

//put request method
router.put('/:emp_name', function (req, res) {
    r.db('Employee').table('emp').
        filter(r.row("name").eq(req.params.emp_name)).
        update({ name: req.body.name }).
        run(connection, function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
});

//get from perticular name
router.get('/:emp_name', function (req, res) {
    r.db('Employee').table('emp').filter(r.row('name').eq(req.params.emp_name)).
        run(connection, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            });
        });

});

//delete document
router.delete('/:emp_name', function (req, res) {
    r.db('Employee').table('emp').
        filter(r.row('name').eq(req.params.emp_name)).
        delete().
        run(connection, function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
});