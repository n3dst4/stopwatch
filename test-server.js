var static = require('node-static');
var open = require("open");
//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server();

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080, "localhost", function () {
    open("http://localhost:8080/test.html");
});
