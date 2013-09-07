var express = require('express');
var app = express();

//without this we can't access request.body
app.use(express.bodyParser());

//api end point which apoorv will call
app.post('/notify', function(request, response) {
  var jsonObj = request.body;
  for(var i = 0;l=jsonObj.length,i<l;i++) {
    var userId = jsonObj[i].userid;
    var message = jsonObj[i].message;
    var fbendUrl = jsonObj[i].url;
  }
  //console.log(userId);
  //console.log(message);
  sendNotifications(userId, message, fbendUrl);
  response.send('Job Initiated');
});

//test url for imitating fb calls
app.get('/fbid', function(request, response) {
  setTimeout(function() {}, 2000);
  response.send('success');
});

app.listen(8080);
console.log('Listening on port 8080');

function sendNotifications(userId, message, fbendUrl)
{
  var async = require('async'); 
  async.mapLimit(userId, 50, callfb, function(error, result) {
    if(error == 'FAIL') {
      console.log('FB request failed '+result);
    }
    else {
      console.log(result);
    }
  });

  function callfb(uid, callback) 
  {
    var request = require('request');
    request('http://localhost:8080/fbid?id='+uid, function(error, response, body) {
      if(!error && response.statusCode == 200) {
        callback(null, body);
      }
      else if(error) {
        callback('FAIL', uid);
      }
    });
  }
}

