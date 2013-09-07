var express = require('express');
var app = express();

//without this we can't access request.body
app.use(express.bodyParser());

app.post('/notify', function(request, response) {
  //jsonObj = [{userid:{1,2,4}, message:'Hi there'}]
  var jsonObj = request.body;
  for(var i = 0;l=jsonObj.length,i<l;i++) {
    var userId = jsonObj[i].userid;
    var message = jsonObj[i].message;
    var fbendUrl = jsonObj[i].url;
  }
  console.log(userId);
  console.log(message);
  sendNotifications();
  response.send('success');
});

app.listen(8080);
console.log('Listening on port 8080');

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

