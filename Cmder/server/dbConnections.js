module.exports = {
  verifyCreateTable: function(r, config, conn, tableName, indexName){
    r.table(tableName).indexWait(indexName).run(conn, function(err, result) {
      if (err) {
        // The database/table/index was not available, create them
        r.dbCreate(config.rethinkdb.db).run(conn, function(err, result) {
          if ((err) && (!err.message.match(/Database `.*` already exists/))) {
            console.log("Could not create the database `"+config.db+"`");
            console.log(err);
            process.exit(1);
          }
          console.log('Database `'+config.rethinkdb.db+'` created.');

          r.tableCreate(tableName).run(conn, function(err, result) {
            if ((err) && (!err.message.match(/Table `.*` already exists/))) {
              console.log("Could not create the table " + tableName);
              console.log(err);
              process.exit(1);
            }
            console.log('Table ' + tableName + ' created.');

            r.table(tableName).indexCreate(indexName).run(conn, function(err, result) {
              if ((err) && (!err.message.match(/Index `.*` already exists/))) {
                console.log("Could not create the index " + tableName);
                console.log(err);
                process.exit(1);
              }

              console.log('Index ' + indexName + ' created.');

              r.table(tableName).indexWait(indexName).run(conn, function(err, result) {
                if (err) {
                  console.log("Could not wait for the completion of the index " + tableName);
                  console.log(err);
                  process.exit(1);
                }
                console.log('Index ' + indexName + ' ready.');
                console.log(tableName + " table and " + indexName + " index are available");
                conn.close();
              });
            });
          });
        });
      }
      else {
        console.log(tableName + " table and " + indexName + " index are available");
      }
    });
  },
};