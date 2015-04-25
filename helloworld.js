function readFile(filename) {
  var sq = ASQ();
  
  fs.readFile(filename, sq.errfcb());
  return sq;
    
}

function done(contents) {
  return contents;
}

function delayMessage(done, contents){
  setTimeout(done(contents), 1000);
}

function say(filename) {
  return readFile(filename)
  .then(delayMessage);
}

var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

module.exports.say = say;