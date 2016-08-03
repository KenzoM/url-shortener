var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var port = 3000;
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
})


app.listen(port,function(){
  console.log('listening in port', port)
})
