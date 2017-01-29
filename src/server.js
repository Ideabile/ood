var fs = require('fs');

var server = require('http').createServer(function(req, res){
  if(req.url.indexOf('.js') > -1){
    res.writeHead(200, 'text/javascript');
    return res.end(fs.readFileSync(__dirname+'/../build.js', {'encoding': 'utf8'}));
  }

  res.writeHead(200, 'text/html');
  res.end(fs.readFileSync(__dirname+'/../index.html', {'encoding': 'utf8'}));
});

server.listen(12345);
