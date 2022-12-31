//simple (and incomplete) http server
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var log = require('log-util');
var interact = require('interactjs');
var dragDropCreator = require('./dragDropCreator');
var mimeTypes = require('./mimeTypes');

http.createServer((req,res) => {
  // get the filepath part of the url requested
  const { pathname }  = url.parse(req.url);
  console.log("pathname is %s", pathname);

  // get the actual system filepath for this
   var filepath = path.join(process.cwd(), "/htdocs/", pathname);
   console.log("filepath is %s", filepath);

   // extract the filename extension
   var extname = String(path.extname(filepath)).toLowerCase();


    mimeTypes.getMimeType(extname);

// see if this file exists
fs.stat(filepath, (err) => {
    if (err){
        // handle case of file not found
        if (err.code == 'EOENT'){
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("404 Not Found\n");
            console.log("EOENT Error")
            console.log(err);
            return;
        }
        // if an error other than EOENT, handle that here
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("500 Error\n");
        console.log("500 error")
        console.log(err);
        return;
    }
    // try to read the file from disk
    fs.readFile(filepath, (err, data) => {
    if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("500 Error\n");
        console.log("Read file error")
        console.log(err);
        return;
    }
    // send the data to the browser via the response
    res.write(data);
    res.end();
    console.log("delivered %s", pathname);
    });
});

}).listen(8080);
