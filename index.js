var express = require('express');
var app = express();

//without this we can't access request.body
app.use(express.bodyParser());

app.post('/notify', function(request, response) {
  console.log(request.body);
  response.send('success');
});

app.listen(8080);
console.log('Listening on port 8080');

/*var http = require('http');

http.createServer(function (request, response) {
  console.log(request.url); 
  if(request.url == '/notify' && request.method == 'POST') {
    console.log(request.body); 
    //how do i parse the post body
    //sendNotifications()
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello Tojo, how do you do!\n');
  }
  else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
  }
}).listen(8080);
*/

function sendNotifications()
{
  //this i can use to call fb api
  /*var request = require('request');
  request('http://www.google.com', function(error, response, body) {
  if(!error && response.statusCode == 200) {
  console.log(body);
  }
  });*/
}

