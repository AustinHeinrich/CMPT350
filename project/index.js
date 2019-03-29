/*
 * Austin Heinrich
 * awh055
 * 11177796
 */

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

/* GET home */
app.get("/", (req, res) => res.sendFile(__dirname + "/map.html"));
app.listen(port, () => console.log(`App listening on port ${port}.`));
