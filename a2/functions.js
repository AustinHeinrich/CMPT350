/*
<<<<<<< HEAD
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
=======
 * Austin Heinrich
 * awh055
 * 11177796
 */


/*
 * mkBoard()
 * initializes required elements for "making" a new messageboard
 */ 
function mkBoard() {
    var aBoard = document.getElementById("newboard").value; // user input
    var boardList = document.getElementById("boardlist");   // current list of boards

    document.getElementById("newboard").value = "";

    // useCheck - True if aBoard has been used previously
    // check if board name used, break to ensure no duplicates
    var useCheck = false; 
>>>>>>> abb475076b2ac42d12386fa993e7ab6274f3157f
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
<<<<<<< HEAD
 * handleBoards(newBoard)
 * aBoard - a board being added to the list of available messageboards
 * handles content of messageboard titles, adding a new messageboard
 */
function handleBoards(aBoard) {
    var xhttp = new XMLHttpRequest();        
    xhttp.open('POST', '/messageboards');    
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
=======
 * addBoard(aBoard)
 * aBoard - title of a new board
 */
function addBoard(aBoard) {
    let xReq = new XMLHttpRequest();
    xReq.open('POST', '/messageboards');
    xReq.setRequestHeader('Content-Type', 'application/json');
>>>>>>> abb475076b2ac42d12386fa993e7ab6274f3157f

    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getBoards();
    }

    xhttp.send(JSON.stringify({
        newBoard : aBoard
    }))
<<<<<<< HEAD
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
=======
}

function getBoards() {
    let xReq = new XMLHttpRequest();
    var boardList = document.getElementById("boardlist");

    xReq.open('GET', '/messageboards');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        
        let res = JSON.parse(this.responseText);

        boardList.options.length = 0;

        for (var i = 0; i < res.length; i++) {
            var opt = res[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            boardList.appendChild(el);
        }
    }

    xReq.send();
} 

// for messages.html

/*
 * mkPost()
 * pulls user input from the bottom text area, the selected board,
 *  and clears the bottom text area
 */
function mkPost() {
    var aPost;          // new post by user
    var selectedBoard;  // board for the post to go to

    selectedBoard = document.getElementById('boardSelect');
    aPost = document.getElementById('newpost').value;
    document.getElementById('newpost').value = "";

    console.log(selectedBoard);
    console.log(aPost);

    addPost(aPost, selectedBoard);
}

function addPost(aPost, selectedBoard) {
    let xReq = new XMLHttpRequest();
    xReq.open('POST', '/messages');
    xReq.setRequestHeader('Content-Type', 'application/json');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getPosts();
    }

    xReq.send(JSON.stringify({
        newPost : aPost
    }))
}

function getPosts() {
    let xReq = new XMLHttpRequest();





    document.getElementById('newpost').value = "";
    xReq.send();
}







/*
function addPost() {
 
    let xReq = new XMLHttpRequest();
    xReq.open('POST', '/messages');
    xReq.setRequestHeader('Content-Type', 'application/json');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getMessages();
    }

    xReq.send(JSON.stringify({
        newMessage : aMessage
    }))

}

function getMessages() {
    let xReq = new XMLHttpRequest();
    var newPost = document.getElementById('newpost').value;
    var selectedBoard = document.getElementById('boardSelect');

    xReq.open('GET', '/messages');
>>>>>>> abb475076b2ac42d12386fa993e7ab6274f3157f

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

<<<<<<< HEAD
    xhttp.send();
}
=======
    document.getElementById('newpost').value = "";
   
} */
>>>>>>> abb475076b2ac42d12386fa993e7ab6274f3157f

