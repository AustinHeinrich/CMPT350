const express = require('express');
const app = express();
const port = 3000;

var messageboards = {}
var messages = {}

app.use(express.static(__dirname));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(__dirname + '/messageboard.html'));

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get('/messageboards', (req, res) => {
    res.status(200).send(Object.keys(messageboards));
})

app.post('/messageboards', (req, res) => {
    let mBoard = req.body;
    let newBoard = mBoard.newBoard;

    messageboards[newBoard] = [];
    res.status(200).send('ok');
})

app.get('/messages', (req, res) => {
    res.status(200).send(Object.keys(messages));
})

app.post('/messages', (req, res) => {
    let nMessage = req.body;
    let newMessage = nMessage.newMessage;

    messages[newMessage] = [];
    res.status(200).send('ok');
})

