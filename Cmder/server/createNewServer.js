var r      = require('rethinkdb');
var config = require(__dirname+"/config.js");
var rConn  = require(__dirname+"/dbConnections.js");

var server = {
  serverName: "dev-1.domain.com"
};

r.connect(config.rethinkdb, function(error, conn) {
  server.createdAt = r.now();
  r.table('servers').insert(server, {returnChanges: true}).run(conn, function(error, result) {
    JSON.stringify(result.changes[0].new_val);
    conn.close();
  });
});
