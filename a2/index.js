/*
 * Austin Heinrich
 * awh055
 * 11177796
 */

const express = require('express');
const app = express();
const port = 3000;

var messageboards = {}
var messages = {}

app.use(express.static(__dirname));
app.use(express.json());

/* GET home */
app.get('/', (req, res) => res.sendFile(__dirname + '/messageboards.html'));
app.listen(port, () => console.log(`App listening on port ${port}.`));

app.get('/messageboards', (req, res) => {
    res.status(200).send(Object.keys(messageboards));
})

app.post('/messageboards', (req, res) => {
    let messageBoard = req.body;
    let newBoard = messageBoard.newBoard;

    messageboards[newBoard] = [];
    res.status(200).send('ok');
})
