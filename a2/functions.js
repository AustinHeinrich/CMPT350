/*
 * addNewBoard()
 * initializes required elements for making a new messageboard
 */
function addNewBoard() {
    var newBoard = document.getElementById("newBoardEntry").value;
    var boardList = document.getElementById("boardList");
    
    document.getElementById("newBoardEntry").value = ""; // clear text

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

    xhttp.send(JSON.stringify({
        newBoard : aBoard
    }))
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

        // get items from JSON, place them into the board list
        let res = JSON.parse(this.responseText);
        boardList.options.length = 0;
        for (var i = 0; i < res.length; i++) {
            var opt = document.createElement('option');
            var el = res[i];
            opt.value = el;
            opt.innerHTML = el;
            boardList.appendChild(opt);
        }

        boardSelect.options.length = 0;
        boardSelect.innerHTML = boardList.innerHTML;
    }

    xhttp.send();
}

