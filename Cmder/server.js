var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var r       = require('rethinkdb');
var config  = require(__dirname+"/server/config.js");
var rConn   = require(__dirname+"/server/dbConnections.js");


io.on('connection', function(socket){
  console.log('New Client Connected');
});


app.use(express.static(__dirname + '/.tmp/serve/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/app',  express.static(__dirname + '/src/app'));


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));


// Create a RethinkDB connection
app.use(createConnection);

// Define the main routes
// Get all of the apps and their details
app.route('/api/apps').get(getApps);
app.route('/api/installs').get(getInstalls);
app.route('/api/getAutoInstalls').get(getAutoInstalls);
app.route('/api/servers').get(getServers);
// Create a new application
app.route('/api/addNewApp').put(addNewApp);
app.route('/api/addAutoInstall').put(addAutoInstall);
// Perform a quick installation with query monitoring
app.route('/api/quickInstall').put(quickInstall);
app.route('/todo/update').post(update);
// Delete an existing app
app.route('/api/deleteApp').post(del);

// Close the RethinkDB connection
app.use(closeConnection);


function createConnection(req, res, next) {
  r.connect(config.rethinkdb, function(error, conn) {
    if (error) {
      handleError(res, error);
    }
    else {
      // Save the connection in `req`
      req._rdbConn = conn;
      // Pass the current request to the next middleware
      next();
    }
  });
}

function handleError(res, error) {
  console.log(res);
  console.log(error);
  return res.send(500, {error: error.message});
}

// app object contains:
//   {
//   }
function getApps(req, res, next) {
  r.table('apps').orderBy({index: "createdAt"}).run(req._rdbConn, function(error, cursor) {
    if (error) {
      handleError(res, error)
      next();
    }
    else {
      // Retrieve all the todos in an array
      cursor.toArray(function(error, result) {
        if (error) {
          handleError(res, error)
        }
        else {
          // Send back the data
          res.send(JSON.stringify(result));
        }
      });
    }
  });
}

function getInstalls(req, res, next) {
  r.table('installs').orderBy({index: "createdAt"}).run(req._rdbConn, function(error, cursor) {
    if (error) {
      handleError(res, error)
      next();
    }
    else {
      // Retrieve all the todos in an array
      cursor.toArray(function(error, result) {
        if (error) {
          handleError(res, error)
        }
        else {
          // Send back the data
          res.send(JSON.stringify(result));
        }
      });
    }
  });
}

function getAutoInstalls(req, res, next) {
  r.table('autoInstalls').orderBy({index: "createdAt"}).run(req._rdbConn, function(error, cursor) {
    if (error) {
      handleError(res, error)
      next();
    }
    else {
      // Retrieve all the todos in an array
      cursor.toArray(function(error, result) {
        if (error) {
          handleError(res, error)
        }
        else {
          // Send back the data
          res.send(JSON.stringify(result));
        }
      });
    }
  });
}

function getServers(req, res, next) {
  r.table('servers').orderBy('serverName').run(req._rdbConn, function(error, cursor) {
    if (error) {
      handleError(res, error)
      next();
    }
    else {
      // Retrieve all the todos in an array
      cursor.toArray(function(error, result) {
        if (error) {
          handleError(res, error)
        }
        else {
          // Send back the data
          res.send(JSON.stringify(result));
        }
      });
    }
  });
}

function addNewApp(req, res, next) {
  var app = req.body;         // req.body was created by `bodyParser`
  app.createdAt = r.now();    // Set the field `createdAt` to the current time

  r.table('apps').insert(app, {returnChanges: true}).run(req._rdbConn, function(error, result) {
    if (error) {
      handleError(res, error)
    }
    else if (result.inserted !== 1) {
      handleError(res, new Error("Document was not inserted."))
    }
    else {
      res.send(JSON.stringify(result.changes[0].new_val));
    }
    next();
  });
}

function addAutoInstall(req, res, next) {
  var autoInstall = req.body;         // req.body was created by `bodyParser`
  autoInstall.createdAt = r.now();    // Set the field `createdAt` to the current time

  r.table('autoInstalls').insert(autoInstall, {returnChanges: true}).run(req._rdbConn, function(error, result) {
    if (error) {
      handleError(res, error)
    }
    else if (result.inserted !== 1) {
      handleError(res, new Error("Document was not inserted."))
    }
    else {
      res.send(JSON.stringify(result.changes[0].new_val));
    }
    next();
  });
}

// install object contains:
//   {
//     appId:      <id int>,
//     serverName: <server str>,
//     completed:  <bool>,
//     id:         <rethinkdb gen id>,
//     createdAt:  <time date>
//   }
function quickInstall(req, res, next) {
  // req.body will contain app and server
  var install = req.body;
  install.createdAt = r.now();

  r.table('installs').insert(install, {returnChanges: true}).run(req._rdbConn, function(error, result){
    if(error){
      handleError(res, error);
    }
    else if(result.inserted !== 1){
      handleError(res, new Error("Document was not inserted."));
    }
    else{
      var newId = result.generated_keys[0];
      console.log('NewId: ' + newId);
      // Monitor for changes for the newly inserted install
      r.table("installs").get(newId).changes().run(req._rdbConn, function(error, cursor){
        cursor.each(function(error, row){
          console.log('Row');
          console.log(row);
          if(row){
            io.emit('installs update', JSON.stringify(row.new_val));
          }
        });
      });
      console.log(result)
      result.installInProgress = true;
      // Send the success response to client
      res.send(JSON.stringify(result));
      // After some time, update the document
      setTimeout(function(){
        install.serverName = 'fak39333';
        install.completed = true;
        console.log('Inside timeout function');
        r.table('installs').get(newId).update(install).run(req._rdbConn, function(error, result){
          console.log('Inside update');
          next();
        });
      }, 5000);
    }
  });
}

function update(req, res, next) {
  var todo = req.body;
  if ((todo != null) && (todo.id != null)) {
    r.table('todos').get(todo.id).update(todo, {returnChanges: true}).run(req._rdbConn, function(error, result) {
      if (error) {
        handleError(res, error)
      }
      else {
        res.send(JSON.stringify(result.changes[0].new_val));
      }
      next();
    });
  }
  else {
    handleError(res, new Error("The todo must have a field `id`."))
    next();
  }
}

function del(req, res, next) {
  var todo = req.body;
  if ((todo != null) && (todo.id != null)) {
    r.table('todos').get(todo.id).delete().run(req._rdbConn, function(error, result) {
      if (error) {
        handleError(res, error)
      }
      else {
        res.send(JSON.stringify(result));
      }
      next();
    });
  }
  else {
    handleError(res, new Error("The todo must have a field `id`."))
    next();
  }
}

function closeConnection(req, res, next) {
  req._rdbConn.close();
  next();
}

r.connect(config.rethinkdb, function(err, conn) {
//   r.tableDrop('installs').run(conn, console.log);
//   return;
  if (err) {
    console.log("Could not open a connection to initialize the database");
    console.log(err.message);
    process.exit(1);
  }
  rConn.verifyCreateTable(r, config, conn, 'installs', 'createdAt');
  rConn.verifyCreateTable(r, config, conn, 'apps', 'createdAt');
  rConn.verifyCreateTable(r, config, conn, 'servers', 'createdAt');
  rConn.verifyCreateTable(r, config, conn, 'autoInstalls', 'createdAt');

  r.table("installs").changes().run(conn, function(error, cursor){
    cursor.each(function(error, row){
      console.log('Row');
      console.log(row);
      if(row){
        console.log('New Change. Sleeping for 10s');
        setTimeout(function(){
          io.emit('installs update', JSON.stringify(row.new_val))
        }, 10000);
      }
    });
  });
});


// Serve the one AngularJS index page
app.get('/', function (req, res) {
  res.send('./.tmp/serve/index.htmls');
});

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
// });

// Start listening for connections
http.listen(3000, function(){
  console.log('listening on *:3000');
});