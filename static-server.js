var http = require("http");
var node_static = require("node-static");

var file = new node_static.Server("./public");

http.createServer(function(req, resp){
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


