/*
 * Austin Heinrich
 * awh055
 * 11177796
 */

var broc = new Map();

/*
 * addNewBoard()
 * initializes required elements for making a new messageboard
 */
function addNewBoard() {
    var newBoard = document.getElementById("newBoardEntry").value;
    var boardList = document.getElementById("boardList");
    
    document.getElementById("newBoardEntry").value = ""; // clear text

    if (newBoard == "") return;

    // useCheck - true if newBoard has been used previously
    // check if a board name has been used, break to ensure no duplicates
    var useCheck = false;
    for (var i = 0; i < boardList.length; i++) {
        if (boardList.options[i].value == newBoard) {
            alert("That is already a board.");
            useCheck = true;
            break;
        }
    }

    if (useCheck == false) handleBoards(newBoard);
    else return;
}

/*
 * handleBoards(newBoard)
 * aBoard - a board being added to the list of available messageboards
 * handles content of messageboard titles, adding a new messageboard
 */
function handleBoards(aBoard) {
    var xhttp = new XMLHttpRequest();        
    xhttp.open('POST', '/messageboards');    
    xhttp.setRequestHeader('Content-Type', 'application/json'); 

    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getBoards();
    }

    boards = {board : aBoard};
    xhttp.send(JSON.stringify(boards));

} 

/*
 * getBoards()
 * reads a JSON, getting the names of the messageboards
 */
function getBoards() {
    var xhttp = new XMLHttpRequest();
    var boardList = document.getElementById("boardList");
    var boardSelect = document.getElementById("boardSelect");
    xhttp.open('GET', '/messageboards');

    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;

        // get items from JSON, place them into the board select list
        //  and also place them in the upper text area (list of message boards)
        let res = JSON.parse(this.responseText);
        res.sort();
        boardSelect.options.length = 0;
        boardList.value = ""
        for (var i = 0; i < res.length; i++) {
            var opt = document.createElement('option');
            var el = res[i];
            opt.value = el;
            opt.innerHTML = el;
            boardSelect.appendChild(opt);
            
            boardList.value += (boardSelect.options[i].value + '\n');
        }
    }

    xhttp.send();
}

/*
 * handleMessages() 
 * initializes required elements for posting a new message to a specified messageboard
 * handles adding a new message, content of the messages
 */
function handleMessages() {
    var messageBoards = document.getElementById("boardSelect");
    var selectedMessageBoard = messageBoards.value;
    var newMessage = document.getElementById("newPostEntry").value;     

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/messages');    
    xhttp.setRequestHeader('Content-Type', 'application/json'); 

    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getMessages();
    }


    // don't worry about a map appending, just replace everything
    broc.set("hello", ["one","two","three"]);
    console.log(broc);
    xhttp.send(JSON.stringify());

    // hash table brother!
    // need to take selected board, compare it with key in the JSON file, and then append to those tables
    // no need for if statements/switches, literally why were you even thinking of those that's practically impossible
    // without stupid stuff
    // but now, you take the current value and use it as a key! Grab the messages and we're golden

}

function getMessages() {
    var xhttp = new XMLHttpRequest();
    var posts = document.getElementById("posts");
    xhttp.open('GET', '/messages');

    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;

        let res = JSON.parse(this.responseText);
        posts.value = "";
        for (var i=0; i < res.length; i++) {
            posts.value.appendChild(res[i]);
        }

    }

    xhttp.send();
}
