var r      = require('rethinkdb');
var config = require(__dirname+"/config.js");
var rConn  = require(__dirname+"/dbConnections.js");

var install = {
  appId: 2,
  serverName: "dev-2.domain.com",
  completed: false
};

r.connect(config.rethinkdb, function(error, conn) {
  install.createdAt = r.now();
  r.table('installs').insert(install, {returnChanges: true}).run(conn, function(error, result) {
    JSON.stringify(result.changes[0].new_val);
    conn.close();
  });
});
