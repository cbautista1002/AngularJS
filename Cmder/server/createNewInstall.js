var r      = require('rethinkdb');
var config = require(__dirname+"/config.js");
var rConn  = require(__dirname+"/dbConnections.js");

// Budget Manager
// Cloud Nirvana
// Dfndr
// Theme Setter
// Simon
// Grade Tracker
// Text Edit
// Logger
// Student Management
// Zombie Protection
// Creepy Crawler Sims
// Flight Planner

var install = {
  appName: "Flight Planner",
  serverName: "dev-1.domain.com",
  completed: false
};

r.connect(config.rethinkdb, function(error, conn) {
  install.createdAt = r.now();
  r.table('installs').insert(install, {returnChanges: true}).run(conn, function(error, result) {
    conn.close();
  });
});
