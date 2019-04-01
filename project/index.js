/*
 * Austin Heinrich
 * awh055
 * 11177796
 *
 * A program utilizing the Google Maps API - displays restaraunts but only when they are open
 * 
 */

const express = require("express");
const path = require('path');
const app = express();
const port = 7777;

app.use(express.static(__dirname));

/* GET main page */
app.get("/", (request, response) => response.sendFile(path.resolve(__dirname + "/map.html")));

/* Route not found (404) */
app.use((req, res, next) => res.status(404).sendFile(path.resolve(__dirname + "/images/404.jpg")));

/* Server error (500) */
app.use(function (err, req, res, next) {
  console.log(err);
  return res.status(500).sendFile(path.resolve(__dirname + "/images/500.jpg"));
});

/* Begin server */
app.listen(port, () => console.log(`App listening on port ${port}.`));