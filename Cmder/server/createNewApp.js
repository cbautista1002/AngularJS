var r      = require('rethinkdb');
var config = require(__dirname+"/config.js");
var rConn  = require(__dirname+"/dbConnections.js");

var newApp1 = {
  appName:       'Budget Manager',
  appId:         '1',
  version:       '0.2.3',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '483KB',
  description:   'Most complete budget management application!',
  svgIconFile:   'ic_account_balance_black_48px.svg'
};
var newApp2 = {
  appName:       'Cloud Nirvana',
  appId:         '2',
  version:       '2.1.9',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '25MB',
  description:   'Safe and automatic backups to the cloud',
  svgIconFile:   'ic_backup_black_48px.svg'
};
var newApp3 = {
  appName:       'Dfndr',
  appId:         '3',
  version:       '5.0.0',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '728MB',
  description:   'Do not go online without this app securing you first!',
  svgIconFile:   'ic_vpn_key_black_48px.svg'
};

var newApp4 = {
  appName:       'Theme Setter',
  appId:         '4',
  version:       '3.5.8',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '13KB',
  description:   'Theme Setter!',
  svgIconFile:   null
};
var newApp5 = {
  appName:       'Simon',
  appId:         '5',
  version:       '9.0.1',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '224MB',
  description:   'Simon',
  svgIconFile:   null
};
var newApp6 = {
  appName:       'Grade Tracker',
  appId:         '6',
  version:       '1.0.0',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '78KB',
  description:   'Grade Tracker',
  svgIconFile:   null
};

var newApp7 = {
  appName:       'Text Edit',
  appId:         '7',
  version:       '3.5.0',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '1MB',
  description:   'Text Edit',
  svgIconFile:   null
};
var newApp8 = {
  appName:       'Logger',
  appId:         '8',
  version:       '8.1.1',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '4KB',
  description:   'Logger',
  svgIconFile:   null
};
var newApp9 = {
  appName:       'Student Management',
  appId:         '9',
  version:       '1.0.9',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '78MB',
  description:   'Student Management',
  svgIconFile:   null
};

var newApp10 = {
  appName:       'Zombie Protection',
  appId:         '10',
  version:       '12.59.8',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '102MB',
  description:   'Zombie Protection',
  svgIconFile:   null
};
var newApp11 = {
  appName:       'Creepy Crawler Sims',
  appId:         '11',
  version:       '34.0.0',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '144MB',
  description:   'Creepy Crawler Sims',
  svgIconFile:   null
};
var newApp12 = {
  appName:       'Flight Planner',
  appId:         '12',
  version:       '1.12.9',
  releaseDate:   null,
  developerName: 'Carlos Bautista',
  sizeOnDisk:    '2KB',
  description:   'Flight Planner',
  svgIconFile:   null
};


r.connect(config.rethinkdb, function(error, conn) {
  newApp12.createdAt = r.now();
  r.table('apps').insert(newApp12, {returnChanges: true}).run(conn, function(error, result) {
    JSON.stringify(result.changes[0].new_val);
    conn.close();
  });
});
