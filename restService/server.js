var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
//connect to mongodb database 
mongoose.connect("mongodb://localhost/Employee");

var router = express.Router();

//create schema variable
var Schema = mongoose.Schema;

//define structure of Schema
var EmpSchema = new Schema(
    {
        name: String,
        address: String
    }
);

//define model from schema
var EmpSchema = mongoose.model('EmpSchema', EmpSchema);

//add middlewares 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//add route
app.use('/', router);

var emp = new EmpSchema();

//start server
app.listen('3000');
console.log("server is strted on 3000");

//get request method
router.get('/', function (req, res) {
    res.json({ "message": "service is started" });
});

//post request method
router.post('/', function (req, res) {

    emp.name = req.body.name;
    emp.address = req.body.address;
    emp.save();
});

//put request method
router.put('/:emp_name', function (req, res) {
    EmpSchema.update({ "name": req.params.emp_name }, { $set: { "address": req.body.address } }, { upsert: false, multi: true }, function (err, emps) {
        if (err) {
            console.log("error");
        }
        console.log(emps);
        res.end();
    });
});

//get from perticular name
router.get('/:emp_name', function (req, res) {
    EmpSchema.find({ "name": req.params.emp_name }, function (err, cb) {
        console.log(req.param.emp_name);
        res.json(cb);
    });

});

//delete document
router.delete('/:emp_name', function (req, res) {
    EmpSchema.findOneAndRemove({ "name": req.params.emp_name }, function (err, emps) {
        if (err) { }
        res.json(emps._id);
    });
});