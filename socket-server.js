

var http = require("http");
var node_static = require("node-static");

var file = new node_static.Server("./public");

var http_server = http.createServer(function(req, resp){
  req.addListener("end", function(){
    file.serve(req, resp, function (err, result) {
            if (err) { // There was an error serving the file 
                resp.end("Error serving " + req.url + " - " + err.message);
 
                // Respond to the client 
                resp.writeHead(err.status, err.headers);
                resp.end();
            }
        });
  }).resume();
}).listen(process.env.PORT, process.env.IP);

var io = require("socket.io").listen(http_server);
//io.set('log level', 1);  //reduce the logging

io.on("connection", function(socket){
	console.log("client connected!");
	socket.on("disconnect", function(){
		console.log("client disconnected");
	});
	var interv = setInterval(function(){
		socket.emit("hello", Math.random());
	}, 1000);
	
	var receiveMessage = function(message){
		socket.emit("receiveMessage", console.log(message));
	};
	
	socket.on("messageit", function(msg) {
	    socket.broadcast.emit("messages", msg);
	});
});