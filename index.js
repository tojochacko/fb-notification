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
    var fbUserIdArr = jsonObj[i].user_ids;
    var message = jsonObj[i].message;
    var fbhref = jsonObj[i].href;
    var fbAccessToken = jsonObj[i].access_token;
  }
  response.send('Job Initiated');
  sendNotifications(fbUserIdArr, message, fbhref, fbAccessToken);
});

app.listen(8080);
console.log('Listening on port 8080');

function sendNotifications(fbUserIdArr, message, fbhref, fbAccessToken)
{
  var async = require('async'); 
  async.mapLimit(fbUserIdArr, noofloops, notifyFB, function(error, result) {
    if(error) {
      writeErrorLog(JSON.stringify(result));
    }
    else {
      console.log(result);
    }
  });

  function notifyFB(fbuid, callback) 
  {
    var request = require('request');
    var fburl = 'https://graph.facebook.com/'+fbuid+'/notifications?access_token='+fbAccessToken+'&template='+message+'&href='+fbhref;
    request({
      method: 'POST',
      uri: fburl}, function(error, response, body) {
        fbrespJson = JSON.parse(body);
        chkErrorCondition = fbrespJson.hasOwnProperty('error');
        if(chkErrorCondition) {
          //error obj is of format
          //{ error: { message: 'Unsupported post request.',
          //type: 'GraphMethodException',
          //code: 100 } }
          fbrespJson.error.fbuid = fbuid;
          callback('FAIL', fbrespJson.error);
        }
        else if(!chkErrorCondition) {
          callback(null, body);
        }
      });
  }
}

function writeErrorLog(logEntry)
{
  var fs = require('fs');
  var log = fs.createWriteStream('log/error.log', {'flags': 'a'});

  var date = new Date();
  var dateTimeString = date.toDateString() + ' ' + date.toTimeString(); 
  logEntry = dateTimeString + '  -  ' + logEntry;
  log.write(logEntry);
}

