async function main() {
  const express = require("express");
  const sqlite3 = require("sqlite3").verbose();
  const auth = require("express-basic-auth");
  const app = express();
  const port = 3000;

  app.use(express.static(__dirname));
  app.use(express.json());

  /* GET home */
  app.get("/", (req, res) => res.sendFile(__dirname + "/chatroom.html"));
  app.listen(port, () => console.log(`App listening on port ${port}.`));

  var db = await new sqlite3.Database("./msgboard.db", err => {
    if (err) return console.error(err.message);
    console.log("Connected to the sqlite3 database.");
  });

  // sql - a sql string e.g.) a SELECT *
  db.get_async = function(sql) {
    var that = this;
    return new Promise((resolve, reject) => {
      that.all(sql, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  db.run_async = function(sql) {
    var that = this;
    return new Promise((resolve, reject) => {
      that.exec(sql, (res, err) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };

  // creating all tables in the database, if they do not exist
  try {
    await db.run_async(`
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(255) PRIMARY KEY,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS msgboards (
            msgboardname VARCHAR(255) PRIMARY KEY,
            boardmessagecount INTEGER
        );

        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message VARCHAR(1024) NOT NULL,
            msgboardname VARCHAR(255) NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            username VARCHAR(255) NOT NULL
        );
    `);
  } catch (err) {
    console.error(err.message);
    return;
  }

  // authorization
  app.use(
    "/messageboards",
    auth({
      authorizer: async (username, password, callback) => {
        try {
          var users = await db.get_async(
            `SELECT * FROM users WHERE username = "${username}";`
          );

          if (users.length == 0) throw "No user found.";
          if (users[0].password !== password) throw "Invalid password.";

          callback(null, true);
        } catch (err) {
          callback(null, false);
        }
      },
      authorizeAsync: true
    })
  );

  // getting all chatrooms
  app.get("/messageboards", async (req, res) => {
    try {
      var boards = await db.get_async(
        "SELECT * FROM msgboards ORDER BY boardmessagecount DESC"
      );

      res
        .status(200)
        .json(boards)
        .end();
    } catch (err) {
      res
        .status(500)
        .json({
          err: err.toString()
        })
        .end();
    }
  });

  // posting a new chatroom
  app.post("/messageboards", async (req, res) => {
    try {
      if (!req.body.msgboardname) throw "Messageboard not found.";
      var boards = await db.run_async(`INSERT INTO msgboards (msgboardname, boardmessagecount) VALUES 
        ("${req.body.msgboardname}", 0);`);

      res
        .status(200)
        .json(boards)
        .end();
    } catch (err) {
      res
        .status(500)
        .json({
          err: err.toString()
        })
        .end();
    }
  });

  // deleting a board
  app.delete("/messageboards/:msgboardname", async (req, res) => {
    try {
      if (!req.params.msgboardname) throw "Messageboard not found.";
      var boards = await db.run_async(`DELETE FROM msgboards WHERE
                    msgboardname = "${req.params.msgboardname}";
                    DELETE FROM messages WHERE 
                      msgboardname = "${req.params.msgboardname}";`);

      res
        .status(200)
        .json(boards)
        .end();
    } catch (err) {
      res
        .status(500)
        .json({
          err: err.toString()
        })
        .end();
    }
  });

  // get all messages for a board
  app.get("/messageboards/:msgboardname", async (req, res) => {
    try {
      if (!req.params.msgboardname) throw "Messageboard not found.";
      var boards = await db.get_async(`SELECT * FROM msgboards WHERE
            msgboardname = "${req.params.msgboardname}";`);

      if (boards.length == 0) throw "Board does not exist.";

      var msgs = await db.get_async(`SELECT * FROM messages WHERE 
            msgboardname = "${
              req.params.msgboardname
            }" ORDER BY datetime(timestamp) DESC;`);

      res
        .status(200)
        .json(msgs)
        .end();
    } catch (err) {
      console.log(err);

      res
        .status(500)
        .json({
          err: err.toString()
        })
        .end();
    }
  });

  // post a message
  app.post("/messageboards/:msgboardname", async (req, res) => {
    try {
      if (!req.params.msgboardname) throw "Messageboard name not found.";
      if (!req.body.message) throw "Message not found.";

      var boards = await db.get_async(`SELECT * FROM msgboards WHERE
            msgboardname = "${req.params.msgboardname}";`);

      if (boards.length == 0) throw "Board does not exist.";

      var user = "admin";

      var sqlRes = await db.run_async(`
                INSERT INTO messages (message, msgboardname, username) VALUES (
                "${req.body.message}","${req.params.msgboardname}","${user}");
                UPDATE msgboards SET boardmessagecount = boardmessagecount + 1 WHERE msgboardname = 
                "${req.params.msgboardname}";`);

      res
        .status(200)
        .json(sqlRes)
        .end();
    } catch (err) {
      res
        .status(500)
        .json({
          error: err.toString()
        })
        .end();
    }
  });
}

main();
