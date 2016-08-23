var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/', routes);
app.listen(process.env.PORT || 3000);
