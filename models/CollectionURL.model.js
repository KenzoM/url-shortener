var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionURL = new Schema({
  longurl: String,
  shorturl: String
})

module.exports = mongoose.model('CollectionURL',collectionURL)
