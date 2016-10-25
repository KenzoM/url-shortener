var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT ||  3000;
var crypto = require("crypto");
var path = require('path');
var CollectionURL = require('./models/CollectionURL.model');
var db = process.env.DB;

mongoose.connect(db);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten',function(req,res){
  var regex = /https:\/\/|http:\/\//;
    //Check if the user input correctly with http or https format
    //if true, proceed. Otherwise, return a string with home direct link
  if(regex.test(req.body.long_url)){
    var longUrl = req.body.long_url;
    var shortUrl = "";
    //check if document (url) exist already in collection
    CollectionURL.findOne({
      longurl: longUrl
    })
      .exec(function(err,result){
        if (err) {throw err};
        //if the long url is in the collection, simply return the short_url
        if (result){
          CollectionURL.findOne({longurl : longUrl })
            .exec(function(err,result){
              res.send({shortUrl: result.shorturl})
            })
        }
        //if the long url isn't in the collection, make a new short_url for it
        else {
          var id = crypto.randomBytes(2).toString('hex');
          var newURL = new CollectionURL;
          newURL.longurl = longUrl;
          newURL.shorturl= id;
          newURL.save(function(err,result){
            res.send({shortUrl: result.shorturl})
          })
        }
      })
  } else {
    res.send({shortUrl: "#"})
  }
})

//directs to the long URL that user requested from short-url
app.get('/:id', function(req, res){
  var shortenURL = req.params.id;
  CollectionURL.findOne({
    shorturl: shortenURL
  })
    .exec(function(err, result){
      if (err) {throw err};
      if (result === null){
        res.status(404).send('Not found')
      } else{
        res.redirect(result.longurl)
      }
    })
});

app.listen(port,function(){
  console.log('listening in port', port);
})
