var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contest');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var usersController = require('./controllers/user.controller');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

app.listen(4000, function() {
    console.log('Success')
})

app.post("/api/addUser", usersController.addUser);
app.put("/api/updateUserByID/:userID", usersController.updateUserByID);
app.get("/api/getUsers", usersController.getUsers);
app.get('/api/getUserByID/:userID', usersController.getUserByID);
app.delete('/api/deleteUser/:userID', usersController.deleteUser);