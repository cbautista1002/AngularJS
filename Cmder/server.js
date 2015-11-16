var express = require('express');
var app = express();

app.use(express.static(__dirname + '/.tmp/serve/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/app',  express.static(__dirname + '/src/app'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));


app.get('/', function (req, res) {
  res.send('./.tmp/serve/index.htmls');
});

app.get('/api/apps', function (req, res) {
  var apps = [
    {
      "name":"app1",
      "id": 1,
      "version": "1.8.4",
      "date": "01/23/2015",
      "dev": "bautcar",
      "size": "2.4MB",
      "desc": "this is the best app if you to be able to - this is the best app if you to be able to...."
    }, {
      "name":"app2",
      "id": 2,
      "version": "2.9.1",
      "date": "02/02/2015",
      "dev": "cbautista",
      "size": "0.98MB",
      "desc": "this is the best app if you to be able to - this is the best app if you to be able to...."
    }, {
      "name":"app3",
      "id": 3,
      "version": "3.9.3",
      "date": "03/29/2015",
      "dev": "carlos",
      "size": "9.1MB",
      "desc": "this is the best app if you to be able to - this is the best app if you to be able to...."
    }, {
      "name":"app4",
      "id": 4,
      "version": "4.0.0",
      "date": "09/20/2015",
      "dev": "bautista",
      "size": "1.1GB",
      "desc": "this is the best app if you to be able to - this is the best app if you to be able to...."
    }
  ];
  res.json(apps);
});

app.get('/api/runningInstalls', function (req, res) {
  var runningInstalls = [
    {
      "server": "s1.domain.com",
      "app": "app1",
      "startTime": "11/11/2015 11:50:34 UTC",
      "endTime": "11/11/2015 11:52:17 UTC",
      "requestedBy": "carlos"
    },
    {
      "server": "s2.domain.com",
      "app": "app3",
      "startTime": "11/12/2015 15:01:04 UTC",
      "endTime": "11/12/2015 15:06:33 UTC",
      "requestedBy": "carlos"
    },
    {
      "server": "s3.domain.com",
      "app": "app4",
      "startTime": "11/13/2015 17:21:45 UTC",
      "endTime": "11/13/2015 17:21:59 UTC",
      "requestedBy": "carlos"
    }
  ];
  res.json(runningInstalls);
});

app.get('/api/pastInstalls', function (req, res) {
  var pastInstalls = [
    {
      "server": "s1.domain.com",
      "app": "app1",
      "startTime": "11/11/2015 11:50:34 UTC",
      "endTime": "11/11/2015 11:52:17 UTC",
      "requestedBy": "carlos",
      "passFail": "pass"
    },
    {
      "server": "s2.domain.com",
      "app": "app3",
      "startTime": "11/12/2015 15:01:04 UTC",
      "endTime": "11/12/2015 15:06:33 UTC",
      "requestedBy": "carlos",
      "passFail": "fail"
    },
    {
      "server": "s3.domain.com",
      "app": "app4",
      "startTime": "11/13/2015 17:21:45 UTC",
      "endTime": "11/13/2015 17:21:59 UTC",
      "requestedBy": "carlos",
      "passFail": "pass"
    },
    {
      "server": "s4.domain.com",
      "app": "app4",
      "startTime": "11/13/2015 17:21:45 UTC",
      "endTime": "11/13/2015 17:21:59 UTC",
      "requestedBy": "carlos",
      "passFail": "pass"
    },
    {
      "server": "s5.domain.com",
      "app": "app4",
      "startTime": "11/13/2015 17:21:45 UTC",
      "endTime": "11/13/2015 17:21:59 UTC",
      "requestedBy": "carlos",
      "passFail": "fail"
    },
    {
      "server": "s6.domain.com",
      "app": "app4",
      "startTime": "11/13/2015 17:21:45 UTC",
      "endTime": "11/13/2015 17:21:59 UTC",
      "requestedBy": "carlos",
      "passFail": "fail"
    }
  ];
  res.json(pastInstalls);
});

app.get('/api/servers', function (req, res) {
  var servers = [
    {
      "name": "s1",
      "ip": "192.168.1.1"
    },
    {
      "name": "s2",
      "ip": "192.168.1.2"
    }
  ];
  res.json(servers);
});

app.get('/api/decoedServers', function (req, res) {
  var decoedServers = [
    {
      "name": "s3",
      "ip": "192.168.1.3"
    }, {
      "name": "s4",
      "ip": "192.168.1.4"
    }
  ];
  res.json(decoedServers);
});

app.post('/api/quickInstall', function(req, res) {
  var app = req.body.app;
  var server = req.body.server;
  console.log(app, server);
  res.json({success: true})
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});