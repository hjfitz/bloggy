#!/usr/bin/env node

var
  sql      = require('sqlite3').verbose(),
  express  = require('express'),
  fs       = require('fs'),
  config   = require('./config.json'),
  dbFile   = config.database,
  entryLoc = __dirname + config.entries,
  db
;

//check if the database has been created
if (fs.existsSync(dbFile)) {
  db = new sql.Database(dbFile);
} else {
  console.log("Error, database doesn't exist.");
  console.log("Creating 'entries.db' now...");
  fs.closeSync(fs.openSync(dbFile, 'w'));
}

//check if the table has been created
db.run('SELECT * FROM entry', {}, function(err, row) {
  if (err) db.run('CREATE TABLE entry(title TEXT, location TEXT)')
});

//create the app
var bloggy = express();


//generate an index page
