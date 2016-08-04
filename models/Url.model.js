var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  long_url: String
});

module.exports = mongoose.model('Url',urlSchema)
