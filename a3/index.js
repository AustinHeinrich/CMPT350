const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./chinook.db', (err) => {
    if (err) {
        return console.error("Error in sqlite3 database.");
    }

    console.log('Connected to the in-memory SQlite database.');
});

let sql = 'SELECT DISTINCT Name name FROM playlist ORDER BY name';

db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row.name);
    })
})

db.close((err) => {
    if (err) {
      return console.error("Error in closing sqlite3 database.");
    }

    console.log('Closed the database connection.');
  });