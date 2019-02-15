const express = require('express');
const app = express();
const port = 3000;

var messageboards = {}

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

