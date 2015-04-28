var sys = require("sys"),
	    http = require("http"),
	    url = require("url"),
	    path = require("path"),
	    fs = require("fs");
 
	http.createServer(function(request, response) {
	    var uri = url.parse(request.url).pathname;
	    var filename = path.join(process.cwd(), uri);
	    fs.exists(filename, function(exists) {
	        if(!exists) {
	            response.writeHead(404, {"Content-Type": "text/plain"});
	            response.end("404 Not Foundn");
	            return;
	        }
 
	        fs.readFile(filename, "binary", function(err, file) {
	            if(err) {
	                response.writeHead(500, {"Content-Type": "text/plain"});
	                response.end(err + "n");
	                return;
	            }
 
	            response.writeHead(200);
	            response.end(file, "binary");
	        });
	    });
	}).listen(process.env.PORT, process.env.IP);
 
	console.log("Server running at port:" + process.env.PORT);