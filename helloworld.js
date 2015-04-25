function readFile(filename) {
  var sq = ASQ;
  
  return sq(function(done){
    var readStream = fs.createReadStream(filename);
    var data = "";
    
    readStream.on("pipe", function() { fs.createWriteStream(filename+".backup") });
    readStream.on("data", function(chunck){
      data+=chunck;
      
    });
    readStream.on("end", function(){
      done(data);
    });
  });
    
}

function done(contents) {
  return contents;
}

function delayMessage(done, contents){
  setTimeout(done(contents), 1000);
}

function say(filename) {
  return readFile(filename).then(delayMessage);
}

var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

module.exports.say = say;