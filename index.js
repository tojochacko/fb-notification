var noofloops = 100;
var express = require('express');
var app = express();

//without this we can't access request.body
app.use(express.bodyParser());

//api end point which apoorv will call
app.post('/notify', function(request, response) {
  response.send('fail');
  var jsonObj = request.body;
  for(var i = 0;l=jsonObj.length,i<l;i++) {
    var userId = jsonObj[i].user_ids;
    var message = jsonObj[i].message;
    var fbhref = jsonObj[i].href;
    var fbAccessToken = jsonObj[i].access_token;
  }
  sendNotifications(userId, message, fbhref, fbAccessToken);
  response.send('Job Initiated');
});

app.listen(8080);
console.log('Listening on port 8080');

function sendNotifications(userId, message, fbhref, fbAccessToken)
{
  var async = require('async'); 
  async.mapLimit(userId, noofloops, notifyFB, function(error, result) {
    if(error) {
      //write to a log file
      console.log('FB request failed '+result);
    }
    else {
      console.log(result);
    }
  });

  function notifyFB(uid, callback) 
  {
    var request = require('request');
    var fburl = 'https://graph.facebook.com/'+uid+'/notifications?access_token='+fbAccessToken+'&template='+message+'&href='+fbhref;
    request({
      method: 'POST',
      uri: fburl}, function(error, response, body) {
        fbrespJson = JSON.parse(body);
        chkErrorCondition = fbrespJson.hasOwnProperty('error');
        if(chkErrorCondition) {
          callback('FAIL', uid);
        }
        else if(!chkErrorCondition) {
          callback(null, body);
        }
      });
  }
}

