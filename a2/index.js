/*
 * Austin Heinrich
 * awh055
 * 11177796
 */

const express = require('express');
const app = express();
const port = 3000;

var messageboards = {};

app.use(express.static(__dirname));
app.use(express.json());

/* GET home */
app.get('/', (req, res) => res.sendFile(__dirname + '/messageboards.html'));
app.listen(port, () => console.log(`App listening on port ${port}.`));

app.get('/messageboards', (req, res) => {
    res.status(200).send(Object.keys(messageboards));
});

app.get('/messages/:msgBoard', (req, res) => {
    // checks that the board exists
    if (!(req.params.msgBoard in messageboards)) {
        res.status(400).send({
            message: "Board does not exist."
        });
        
        return;
    }

    res.status(200).send(messageboards[req.params.msgBoard]);
});

app.post('/messageboards', (req, res) => {
    var messageBoard = req.body;    // e.g. "{ boards: 'hello' }"
    var board = messageBoard.board; // e.g. "hello"

    messageboards[board] = [];
    res.status(200).send({message : "ok"});
});

app.post('/messages/:msgBoard', (req, res) => {
    if (!(req.params.msgBoard in messageboards)) {
        res.status(400).send({
            message : "Board does not exist."
        });
        
        return;
    }

    if (!("message" in req.body)) {
        res.status(400).send({
            message : "There is no message."
        });

        return;
    }

    if (req.body.message.length == 0) {
        res.status(400).send({
            message : "Message must have content."
        });

        return;
    }

    messageboards[req.params.msgBoard].push(req.body.message);
    res.status(200).send({message : "ok"});
});
