/*
 * Austin Heinrich
 * awh055
 * 11177796
 */

const express = require('express');
const app = express();
const port = 3000;

var messageboards = {}
var messages = new Map();

app.use(express.static(__dirname));
app.use(express.json());

/* GET home */
app.get('/', (req, res) => res.sendFile(__dirname + '/messageboards.html'));
app.listen(port, () => console.log(`App listening on port ${port}.`));

app.get('/messageboards', (req, res) => {
    res.status(200).send(Object.keys(messageboards));
})

app.get('/messages', (req, res) => {
    res.status(200).send(Object.keys(messages));
})

app.post('/messageboards', (req, res) => {
    let messageBoard = req.body;    // e.g. "{ boards: 'hello' }"
    let board = messageBoard.board; // e.g. "hello"

    messageboards[board] = [];
    res.status(200).send('ok');
})

app.post('/messages', (req, res) => {
    let messageObj = req.body;    
    let messages = messageObj.messages;

    messageObj[messages] = [];
    res.status(200).send('ok');
})
