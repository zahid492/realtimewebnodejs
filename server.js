
var args = require("minimist")(process.argv.slice(2), {string: "file"});

function printHelp(){
  console.log("Read file {FILE} --------------- File: {FILE}");
}

if(args.help || !args.file){
  printHelp();
  process.exit(1);
}

var hello = require("./helloworld");
hello.say(args.file)
.val(function(contents){ //Syncronous task
  console.log(contents.toString());
})
//.seq(...) //use seq for asynchronous tasks
.or(function(err){
  console.error("ERROR: " + err);
});
