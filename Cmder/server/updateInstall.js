var r      = require('rethinkdb');
var config = require(__dirname+"/config.js");
var rConn  = require(__dirname+"/dbConnections.js");

var latestDoc = null;

r.connect(config.rethinkdb, function(error, conn) {
  // Get latest entry
  r.table('installs').orderBy({index: r.desc("createdAt")}).limit(1).run(conn, function(error, cursor) {
    cursor.toArray(function(error, result){
      latestDoc = result[0];
      console.log(latestDoc);
      updateStatus(latestDoc);
      conn.close();
    });
  });
});

function updateStatus(latestDoc){
  r.connect(config.rethinkdb, function(error, conn){
    var newLatestDoc = latestDoc;
    newLatestDoc.completed = true;
    // Get entry to complete
    r.table('installs').get(latestDoc.id).update(newLatestDoc, {returnChanges: true}).run(conn, function(error, result){
      console.log('Updated to complete');
      conn.close();
    });
  });
}