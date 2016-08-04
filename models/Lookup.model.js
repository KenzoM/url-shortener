var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lookUpSchema = new Schema({
  key: String,
  shortUrl: String
})

module.exports = mongoose.model('LookUp',lookUpSchema)
