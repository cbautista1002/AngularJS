
// Include necessary packages
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var path = require('path');

app.get('/api/getter', function(req, res) {
  res.json({"testkey":"value"});
});

// Start listening for connections
http.listen(3030, function(){
    console.log('listening on *:3030');
});